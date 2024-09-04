from schemas import (
    PersonalInformation,
    Nominee,
    BaseUser,
    DBUser,
    BindResult,
    DebitSchema,
    RegUser,
    TransferSchema,
)
import w3, db
import shortuuid
from constants import TOKEN
import org_ids
from exceptions import BadRequestException
import security


def create_kyc_information(id_: str, information: PersonalInformation):
    info = db.get_personal_information(id_)

    if info:
        raise BadRequestException("Personal Information already exists")

    res = db.create_personal_info(id_, information)

    return bool(res)


def create_nominee(id_: str, nominee: Nominee):
    exists = db.get_nominee(id_)
    if exists:
        raise BadRequestException("Nominee already exists")
    res = db.create_nominee(id_, nominee)
    return bool(res)


def create_user(user: RegUser):
    user.password = security.hash_password(user.password)
    base_user = user.model_dump()

    base_user["kyc_status"] = "pending"

    db_user = DBUser.model_validate(base_user)

    res = db.create_user(db_user)
    return bool(res)


def update_user_kyc_verify_column(_id: str) -> bool:
    try:
        res = db.update_user_kyc_data(_id)
        return bool(res)
    except Exception as err:
        return False


def bind_user_account(_id: str):

    binded_user = db.get_binded_user(_id)

    if binded_user:
        return BindResult(
            status="binded",
            message="User has been binded",
            wallet_address=w3.get_user_account(_id),
        )
    db.bind_user(_id)

    return BindResult(
        status="binded",
        message="User has been binded",
        wallet_address=w3.get_user_account(_id),
    )


def debit_user(client_secret: str, info: DebitSchema):
    org_id = org_ids.get_ord_id(client_secret)

    if not org_id:
        raise BadRequestException("Invalid client secret")

    tokenAddress = TOKEN.get(info.token)

    if not tokenAddress:
        raise BadRequestException(f"Unsupported token: {info.token}")

    tokenAddress = w3.to_checkum(tokenAddress)

    if not tokenAddress:
        raise BadRequestException(f"Unsupported token: {info.token}")

    client_wallet_account = w3.get_user_account(org_id)
    balance = w3.get_token_balance(w3.get_user_account(info.id), tokenAddress)
    amount_wei = w3.token_amount_to_wei(tokenAddress, info.amount)

    if balance < amount_wei:
        raise BadRequestException("Insufficient Balance")

    transfer_param = [
        {"token": tokenAddress, "to": client_wallet_account, "amount": amount_wei}
    ]
    res = w3.make_transfers(info.id, transfer_param)
    return res


def deposit_to_user(client_secret: str, info: DebitSchema):
    client_address = org_ids.get_ord_id(client_secret)

    if not client_address:
        raise BadRequestException("Invalid client secret")

    tokenAddress = TOKEN.get(info.token)

    if not tokenAddress:
        raise BadRequestException(f"Unsupported token: {info.token}")

    tokenAddress = w3.to_checkum(tokenAddress)

    if not tokenAddress:
        raise BadRequestException(f"Unsupported token: {info.token}")

    balance = w3.get_token_balance(w3.get_user_account(client_address), tokenAddress)
    amount_wei = w3.token_amount_to_wei(tokenAddress, info.amount)

    if balance < amount_wei:
        raise BadRequestException("Insufficient Balance")

    user_address = w3.get_user_account(info.id)

    transfer_param = [{"token": tokenAddress, "to": user_address, "amount": amount_wei}]
    res = w3.make_transfers(client_address, transfer_param)
    return res


def swap(user_id: str, token_in: str, amount_in: float):
    token_address = w3.usdt_ddress if token_in == "usdt" else w3.token_address
    amount_in_wei = w3.token_amount_to_wei(token_address, amount_in)
    balance = w3.check_balance_raw(user_id, token_address)
    print(balance, amount_in_wei)
    if amount_in_wei > balance:
        raise Exception("Insufficient balance")

    return w3.swap(user_id, token_in, amount_in_wei)


def transfer(org_token: str, data: TransferSchema):
    _org_id = org_ids.get_ord_id(org_token)
    if not _org_id:
        raise BadRequestException("Invalid token")
