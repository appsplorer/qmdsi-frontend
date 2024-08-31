from schemas import (
    PersonalInformation, 
    Nominee, 
    BaseUser, 
    DBUser, 
    BindResult,
    DebitSchema
)
import w3, db
import shortuuid
from constants import TOKEN
import org_ids
from exceptions import BadRequestException

def insert_user_id_pic(wallet: str, img_path: str):
    if img_path:
        try:
            res = db.update_image(wallet, img_path)
            return res

        except FileNotFoundError:
            print(f"Error: The file {img_path} was not found.")
            raise  FileNotFoundError
        except Exception as e:
            print(f"An unexpected error occurred: {e}")
            raise FileNotFoundError("An unexpected error occurred.")
    else:
        raise FileNotFoundError("No image path provided.")

def create_kyc_information(wallet_address : str, information : PersonalInformation ):
    info = db.get_personal_information(wallet_address)
    
    if info:
            raise BadRequestException("Personal Information already exists")
    
    res = db.create_personal_info(wallet_address, information)

    return bool(res)


def create_nominee(wallet_address : str, nominee : Nominee):
    exists = db.get_nominee(wallet_address)
    if exists:
        raise BadRequestException("Nominee already exists")
    res = db.create_nominee(wallet_address, nominee)
    return bool(res)


def create_user(user : BaseUser):
    user.wallet_address = user.wallet_address.lower()
    base_user = user.model_dump()
    
    base_user['ref_link'] = shortuuid.uuid()
    base_user['kyc_status'] = "pending"
    db_user = DBUser.model_validate(**base_user) 
    res = db.create_user(db_user)
    return bool(res)



def bind_user_account(address : str):
    binded_user = db.get_binded_user(address)
    
    if binded_user:
        return BindResult(status="binded", message="User has been binded")
    db.bind_user(address)
    return BindResult(status="binded", message="User has been binded")






def debit_user(client_secret : str, info : DebitSchema):
    client_address = org_ids.get_ord_address(client_secret)
    
    if not client_address:
        raise BadRequestException("Invalid client secret")
    
    tokenAddress =  TOKEN.get(info.token)
    
    if not tokenAddress:
        raise BadRequestException(f"Unsupported token: {info.token}")
    
    tokenAddress = w3.to_checkum(tokenAddress)
    
    if not tokenAddress:
        raise BadRequestException(f"Unsupported token: {info.token}")
    

    client_wallet_account = w3.get_user_account(client_address)
    balance = w3.get_token_balance(w3.get_user_account(info.address), tokenAddress)
    amount_wei = w3.token_amount_to_wei(tokenAddress, info.amount)
   
    if balance < amount_wei:
        raise BadRequestException("Insufficient Balance")
    
    
    transfer_param = [ {
        "token" : tokenAddress,
        "to" : client_wallet_account,
        "amount" : amount_wei
    }]
    res = w3.make_transfers(info.address, transfer_param)
    return res


def deposit_to_user(client_secret : str, info : DebitSchema):
    client_address = org_ids.get_ord_address(client_secret)
    
    if not client_address:
        raise BadRequestException("Invalid client secret")
    
    tokenAddress =  TOKEN.get(info.token)
    
    if not tokenAddress:
        raise BadRequestException(f"Unsupported token: {info.token}")
    
    tokenAddress = w3.to_checkum(tokenAddress)
    
    if not tokenAddress:
        raise BadRequestException(f"Unsupported token: {info.token}")
    
    
    balance = w3.get_token_balance(w3.get_user_account(client_address), tokenAddress)
    amount_wei = w3.token_amount_to_wei(tokenAddress, info.amount)
   
    if balance < amount_wei:
        raise BadRequestException("Insufficient Balance")
    
    
    transfer_param = [ {
        "token" : tokenAddress,
        "to" : info.address,
        "amount" : amount_wei
    }]
    res = w3.make_transfers(client_address, transfer_param)
    return res