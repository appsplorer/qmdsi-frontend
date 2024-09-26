from fastapi import (
    FastAPI,
    Header,
    UploadFile,
    File,
    Depends,
    HTTPException,
    status,
    Request,
)

from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from schemas import (
    PersonalInformation,
    Nominee,
    DebitSchema,
    RegUser,
    DBUser,
    SwapParams,
    TransferSchema,
    BindRequestSchema,
    BuyGoldSchema,
    SellGoldSchema,
    ForgetPassowrd,
    ResetUserPassword,
    DepositReq,
    TransferResponse,
)

import core, db, w3
import constants
import exceptions
import security
import emails
from security import Jwt
import kyc
from dependencies import current_user, current_org
from exceptions import BadRequest
import org_ids
import config
from PIL import Image
import json
import fiat

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

date_format = "%Y-%m-%d"


@app.get("/")
async def read_root():
    return {"status": "up"}


@app.get("/rate")
def get_php_rate():
    return {"rate": fiat.get_rate()}


@app.post("/signup")
def sign_up(user: RegUser):
    email_user = db.get_user_by_email(user.email)
    if email_user:
        raise exceptions.BadRequest("Email already in use")
    phone_user = db.get_user_by_phone(user.phone_number)
    if phone_user:
        raise exceptions.BadRequest("Phone number already in use")
    res = core.create_user(user)
    return res


@app.post("/login")
def login_user(request_form: OAuth2PasswordRequestForm = Depends()):
    user = db.get_user_by_email(request_form.username)
    print(request_form.username)
    if not user:
        raise exceptions.BadRequest("Invalid credentials")
    is_valid_password = security.verify_password(request_form.password, user.password)
    if not is_valid_password:
        raise exceptions.BadRequest("Invalid credentials")
    acces_token = Jwt.get_access_token(user.id)
    return {"access_token": acces_token}


@app.post("/forget_password")
def forget_password(data: ForgetPassowrd):
    user = db.get_user_by_email(data.email)

    if not user:
        raise BadRequest("User not found")

    token = Jwt.encode_reset_password(data.email)

    link = f"{config.FRONTEND_URL}/reset_password?token={token}"
    print(link)
    emails.send_forgot_password_email(data.email, link)
    return True


@app.post("/reset_password")
def reset_user_password(data: ResetUserPassword):
    return core.reset_password(data)


@app.get("/user")
def get_a_user(user: DBUser = Depends(current_user)):
    raw_user = user.model_dump()
    wallet_address = w3.get_user_account(user.id)
    del raw_user["password"]
    raw_user["wallet_address"] = wallet_address
    raw_user["referral_sign_ups"] = db.user_refs(user.ref_link)
    return raw_user


@app.get("/refs")
def get_user_ref(user: DBUser = Depends(current_user)):
    return db.user_refs(user.ref_link)


@app.get("/deposits")
def get_user_deposits(
    user: DBUser = Depends(current_user),
):
    return db.get_user_deposits(user.id)


@app.post("/fiat/deposit")
def deposit_fiat(
    data: DepositReq,
    user: DBUser = Depends(current_user),
):
    return core.deposit_fiat(user.id, data.amount)


@app.get("/deposits/{deposit_id}")
def get_deposit(
    deposit_id: str,
):
    return core.get_deposit(deposit_id)


@app.post("/deposits/{deposit_id}")
def process_deposit(
    deposit_id: str,
):
    try:
        core.process_deposit(deposit_id)
        return True
    except Exception as e:
        pass
    return False


@app.post("/notify")
async def get_notification(request: Request):
    body_raw = await request.body()
    body = json.loads(body_raw)
    print(body)
    order_id = body["orderSeq"]
    try:
        core.process_deposit(order_id)
    except Exception as e:
        print(e)
    return "Processed"


@app.post("/personal_information")
def post_personal_information(
    personal_info: PersonalInformation,
    user: DBUser = Depends(current_user),
):
    try:
        personal_info_data = core.get_personal_info(user.id)
        if personal_info_data:
            res = core.update_kyc_information(user.id, personal_info)
            return res

        res = core.create_kyc_information(user.id, personal_info)
        return res
    except Exception as e:
        print(f"Error occurred: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/personal_information/images")
async def upload_kyc_images(
    documentImage: UploadFile = File(...),
    user: DBUser = Depends(current_user),
):
    try:
        filename = documentImage.filename if documentImage.filename else "duno.jpg"
        kyc.verify_user_document(documentImage.file, filename, user.id)
        return True
    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@app.post("/verify")
async def upload_image(
    image: UploadFile = File(...),
    user: DBUser = Depends(current_user),
):
    try:
        face_path = kyc.save_user_face(image.file, user.id)
        with open(face_path, "rb") as user_face:
            kyc.verify_user_face(user_face, user.id, user.email)
        return {"status": "success", "message": "Face verification successful"}
    except Exception as e:
        print(f"Error occurred: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/personal_information")
def get_personal_information(user: DBUser = Depends(current_user)):
    res = core.get_personal_info(user.id)
    return res


@app.post("/nominee")
def post_user_nominee(nominee: Nominee, user: DBUser = Depends(current_user)):
    try:
        existing_nominee = db.get_nominee(user.id)
        if existing_nominee:
            return db.update_nominee_info(user.id, nominee)

        res = core.create_nominee(user.id, nominee)
        return res
    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@app.post("/nominee/image")
async def upload_nominee_id_image(
    personalId: UploadFile = File(...), user: DBUser = Depends(current_user)
):
    try:
        return True

    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@app.get("/nominee")
def get_user_nominee(user: DBUser = Depends(current_user)):
    return db.get_nominee(user.id)


@app.get("/api/account/bind")
def get_bind_status(
    user_id: str,
    x_token: str = Depends(current_org),
):
    return bool(db.get_binded_user(user_id))


@app.post("/api/account/binding")
def bind_account(
    data: BindRequestSchema,
    x_token: str = Depends(current_org),
):
    org_id = org_ids.get_ord_id(x_token)
    if not org_id:
        raise exceptions.BadRequest("Invalid token")
    return core.bind_user_account(data.identificationNumber)


@app.get("/api/account/balance")
def get_balance(userId: str):
    balances = {}
    for item in constants.TOKEN.items():
        balances[item[0]] = w3.check_balance(userId, item[1])
    return balances


@app.post("/swap")
def swap_token(swap: SwapParams, user: DBUser = Depends(current_user)):
    if swap.amount_in <= 0:
        raise exceptions.BadRequestException("Invalid amountIn")
    try:
        res = core.swap(user.id, swap.token_in, swap.amount_in)
        return {"hash": res}
    except Exception as e:
        print(e)
        raise exceptions.BadRequestException(f"Error occured {e}")


@app.post(
    "/api/account/transfer",
    response_model=TransferResponse,
    responses={
        400: {"description": "Invalid token"},
    },
)
def transfer_token(
    data: TransferSchema,
    x_token: str = Depends(current_org),
):
    response = core.transfer(x_token, data)
    return response


@app.get(
    "/api/account/transfer",
    # response_model=,
    responses={
        400: {"description": "Invalid token"},
    },
)
def get_token_transfers(
    transfer_id: str,
    x_token: str = Depends(current_org),
):
    transfers = db.get_transfers("id", transfer_id)
    if transfers:
        return transfers[0]
    return None


@app.get("/api/user/transfers")
def get_user_transfers(
    user_account: str,
    x_token: str = Depends(current_org),
):
    return db.get_transfers("user_account", user_account)


# @app.post("/api/account/debit")
# def debit_user(data: DebitSchema, x_token: str = Header(...)):
#     hash = core.debit_user(x_token, data)
#     return {"hash": hash}


# @app.post("/api/account/deposit")
# def deposit_to_user(info: DebitSchema, x_token: str = Header(...)):
#     hash = core.deposit_to_user(x_token, info)
#     return {"hash": hash}


@app.post("/api/gold/buy")
def buy_gold(
    data: BuyGoldSchema,
    x_token: str = Depends(current_org),
):
    return core.buy_gold(data, x_token)


@app.post("/api/gold/sell")
def sell_gold(
    data: SellGoldSchema,
    x_token: str = Depends(current_org),
):
    return core.sell_gold(data, x_token)
