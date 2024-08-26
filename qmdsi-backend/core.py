from schemas import PersonalInformation, Nominee, BaseUser, DBUser, BindResult
from exceptions import BadRequestException
import db
import shortuuid


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


def debit_user(address : str, amount : float):
    pass