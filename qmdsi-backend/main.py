from fastapi import FastAPI, Body, Header
from eth_typing import ChecksumAddress
from schemas import (
    PersonalInformation, 
    Nominee, 
    BaseUser, 
    Tokens,
    DebitSchema
)
import core, db, w3
import constants
import exceptions
app = FastAPI()

@app.get("/")
async def read_root():
    return {"message": "Hello, World!"}



@app.post("/signup")
def sign_up(
    user : BaseUser
):
    res = core.create_user(user)
    return res


@app.get("/user")
def get_a_user(address : str):
    return db.get_user(address)


@app.get("/refs")
def get_user_ref(address : str):
    user = db.get_user(address)
    if not user:
        return None 
    return db.user_refs(user.ref_link)


@app.post("/personal_information")
def post_personal_information(
    personal_info : PersonalInformation,
    address : ChecksumAddress = Body()
):
    res = core.create_kyc_information(address, personal_info)
    return res


@app.get("/personal_information")
def get_personal_information(address : str):
    res = db.get_personal_information(address) 
    return res


@app.post("/nominee")
def post_user_nominee(
    nominee : Nominee,
    address : ChecksumAddress = Body()
):
    res = core.create_nominee(address, nominee)
    return res


@app.get("/nominee")
def get_user_nominee(
    address : str
):
    return db.get_nominee(address)


@app.get("/bind")
def get_bind_status(address : str):
    return bool(db.get_binded_user(address))


@app.post("/bind")
def bind_account(
    address : str  = Body()
):
    return core.bind_user_account(address) 



@app.get("/balance")
def get_balance(
    address : str,
    token : Tokens
):
    token_address = constants.TOKEN.get(token)
    if not token_address:
         raise exceptions.BadRequestException("Personal Information already exists")
    balance = w3.check_balance(address, token_address)
    return balance



@app.post("/debit")
def debit_user(
    data : DebitSchema,
    x_token: str = Header(...)  
):
    hash = core.debit_user(x_token, data)
    return {"hash" : hash}


@app.post("/deposit")
def deposit_to_user(
    info : DebitSchema,
    x_token: str = Header(...)
):
    hash = core.deposit_to_user(x_token, info)
    return {"hash" : hash}
