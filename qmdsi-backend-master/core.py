from schemas import (
    PersonalInformation,
    Nominee,
    BaseUser,
    DBUser,
    BindResult,
    DebitSchema,
    RegUser,
    TransferSchema,
    BuyGoldSchema,
    Tokens,
    SellGoldSchema,
)
import w3, db
import shortuuid
from constants import TOKEN
import org_ids
from exceptions import BadRequestException
import security


def get_personal_info(_id: str):
    res = db.get_personal_information(_id)
    return res


def create_kyc_information(id_: str, information: PersonalInformation):
    info = db.get_personal_information(id_)

    if info:
        raise BadRequestException("Personal Information already exists")

    res = db.create_personal_info(id_, information)

    return bool(res)


def update_kyc_information(id_: str, information: PersonalInformation):
    try:
        res = db.update_personal_info(id_, information)
        return bool(res)
    except Exception as err:
        print(err)
        raise BadRequestException(f"{err}")


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
            status="success",
            walletAddress=w3.get_user_account(_id),
        )
    db.bind_user(_id)

    return BindResult(
        status="success",
        walletAddress=w3.get_user_account(_id),
    )


def debit_user(client_secret: str, info: DebitSchema, convert_to_wei: bool = True):
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

    if convert_to_wei:
        amount_wei = w3.token_amount_to_wei(tokenAddress, info.amount)
    else:
        amount_wei = info.amount

    if balance < amount_wei:
        raise BadRequestException("Insufficient User Balance")

    transfer_param = [
        {"token": tokenAddress, "to": client_wallet_account, "amount": amount_wei}
    ]
    res = w3.make_transfers(info.id, transfer_param)
    return res


def deposit_to_user(client_secret: str, info: DebitSchema):
    client_id = org_ids.get_ord_id(client_secret)

    if not client_id:
        raise BadRequestException("Invalid client secret")

    tokenAddress = TOKEN.get(info.token)

    if not tokenAddress:
        raise BadRequestException(f"Unsupported token: {info.token}")

    tokenAddress = w3.to_checkum(tokenAddress)

    if not tokenAddress:
        raise BadRequestException(f"Unsupported token: {info.token}")

    balance = w3.get_token_balance(w3.get_user_account(client_id), tokenAddress)
    amount_wei = w3.token_amount_to_wei(tokenAddress, info.amount)

    if balance < amount_wei:
        raise BadRequestException(
            "Transaction failed due to insufficient funds in Master Wallet"
        )

    user_address = w3.get_user_account(info.id)

    transfer_param = [{"token": tokenAddress, "to": user_address, "amount": amount_wei}]
    res = w3.make_transfers(client_id, transfer_param)
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


def buy_gold(data: BuyGoldSchema, x_token: str):

    qmdt_amount = w3.convert_usd_to_qmdt(data.amountUSD)
    info = DebitSchema(token=Tokens.qmgt, id=data.userId, amount=qmdt_amount)
    hash = debit_user(x_token, info)
    return {"status": "success", "transactionRef": hash}


def sell_gold(data: SellGoldSchema, x_token: str):

    info = DebitSchema(token=Tokens.qmgt, id=data.userId, amount=data.amountQMGT)
    hash = deposit_to_user(x_token, info)
    return {"status": "success", "transactionRef": hash}
