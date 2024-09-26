from schemas import (
    PersonalInformation,
    Nominee,
    DBUser,
    BindResult,
    DebitSchema,
    RegUser,
    TransferSchema,
    BuyGoldSchema,
    Tokens,
    SellGoldSchema,
    ResetUserPassword,
    TransferParams,
    TransferResponse,
    TransferStatus,
    TransferData,
)
import w3, db
from constants import TOKEN
import org_ids
from exceptions import BadRequestException
import security, shortuuid
import fiat
from constants import transaction_states


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

    if not tokenAddress:
        raise BadRequestException(f"Unsupported token: {info.token}")

    tokenAddress_ = w3.to_checkum(tokenAddress)
    client_wallet_account = w3.get_user_account(org_id)
    balance = w3.get_token_balance(w3.get_user_account(info.id), tokenAddress)

    if convert_to_wei:
        amount_wei = w3.token_amount_to_wei(tokenAddress, info.amount)
    else:
        amount_wei = int(info.amount)

    if balance < amount_wei:
        raise BadRequestException("Insufficient User Balance")
    param = TransferParams(
        token=tokenAddress_, to=client_wallet_account, amount=amount_wei
    )
    # transfer_param = [
    #     {"token": tokenAddress, "to": client_wallet_account, "amount": amount_wei}
    # ]
    res = w3.make_transfers(info.id, [param])
    return res


def deposit_to_user(client_secret: str, info: DebitSchema):
    client_id = org_ids.get_ord_id(client_secret)

    if not client_id:
        raise BadRequestException("Invalid client secret")

    tokenAddress = TOKEN.get(info.token)

    if not tokenAddress:
        raise BadRequestException(f"Unsupported token: {info.token}")

    tokenAddress_ = w3.to_checkum(tokenAddress)
    balance = w3.get_token_balance(w3.get_user_account(client_id), tokenAddress)
    amount_wei = w3.token_amount_to_wei(tokenAddress, info.amount)

    if balance < amount_wei:
        raise BadRequestException(
            "Transaction failed due to insufficient funds in Master Wallet"
        )

    user_address = w3.get_user_account(info.id)
    param = TransferParams(token=tokenAddress_, to=user_address, amount=amount_wei)
    # transfer_param = [{"token": tokenAddress, "to": user_address, "amount": amount_wei}]
    res = w3.make_transfers(client_id, [param])
    return res


def swap(user_id: str, token_in: str, amount_in: float):
    token_address = w3.usdt_ddress if token_in == "usdt" else w3.token_address
    amount_in_wei = w3.token_amount_to_wei(token_address, amount_in)
    balance = w3.check_balance_raw(user_id, token_address)
    print(balance, amount_in_wei)

    if amount_in_wei > balance:
        raise Exception("Insufficient balance")

    return w3.swap(user_id, token_in, amount_in_wei)


def transfer(
    org_token: str,
    data: TransferSchema,
) -> TransferResponse:
    _org_id = org_ids.get_ord_id(org_token)

    if not _org_id:
        raise BadRequestException("Invalid token")

    user = db.get_user(data.userAccount)

    if not user:
        return TransferResponse(
            status=TransferStatus.failed, errorMsg="toAccount user does not exists"
        )
    user_address = w3.get_user_account(data.userAccount)
    org_wallet = w3.get_user_account(_org_id)
    token_address = w3.to_checkum(TOKEN["qmgt"])
    qmgt_amount = w3.convert_usd_to_qmdt(data.amountInUSD)

    if data.type == "credit":
        params = TransferParams(
            to=user_address, token=token_address, amount=qmgt_amount
        )
        balance = w3.get_token_balance(org_wallet, token_address)
        if balance < qmgt_amount:
            return TransferResponse(
                status=TransferStatus.failed, errorMsg="Insufficient balance"
            )
        from_id = _org_id

    else:
        if not data.userPin:
            return TransferResponse(
                status=TransferStatus.failed, errorMsg="userPin required"
            )

        if int(user.pin) != data.userPin:
            return TransferResponse(
                status=TransferStatus.failed, errorMsg="Incorrect user pin"
            )
        balance = w3.get_token_balance(user_address, token_address)
        if balance < qmgt_amount:
            return TransferResponse(
                status=TransferStatus.failed, errorMsg="Insufficient balance"
            )
        params = TransferParams(to=org_wallet, token=token_address, amount=qmgt_amount)
        from_id = data.userAccount

    hash = w3.make_transfers(from_id, [params])
    hash = f"0x{hash}"
    transaction_id = shortuuid.uuid()
    tk_amt = qmgt_amount / 10**18
    db.create_transfer(
        transaction_id, data.userAccount, data.type, data.amountInUSD, tk_amt, hash
    )
    res = TransferResponse(
        status=TransferStatus.success, data=TransferData(id=transaction_id, hash=hash)
    )
    return res


def buy_gold(data: BuyGoldSchema, x_token: str):

    qmdt_amount = w3.convert_usd_to_qmdt(data.amountUSD)
    info = DebitSchema(token=Tokens.qmgt, id=data.userId, amount=qmdt_amount)
    hash = debit_user(x_token, info)
    return {"status": "success", "transactionRef": hash}


def sell_gold(data: SellGoldSchema, x_token: str):

    info = DebitSchema(token=Tokens.qmgt, id=data.userId, amount=data.amountQMGT)
    hash = deposit_to_user(x_token, info)
    return {"status": "success", "transactionRef": hash}


def reset_password(data: ResetUserPassword):

    res = security.Jwt.decode_reset_password(data.token)
    email = res["sub"]

    update = {}
    update["password"] = security.hash_password(data.password)
    res = db.update_user(email, update)
    return bool(res)


def deposit_fiat(user_id: str, amount: float):
    deposit_id = shortuuid.uuid()
    rate = fiat.get_rate()
    usd_amount = rate * amount
    url = fiat.init_payment(deposit_id, amount)
    db.insert_deposit(deposit_id, user_id, amount, usd_amount, url)
    return db.get_deposit(deposit_id)


def get_deposit(deposit_id: str):
    deposit = db.get_deposit(deposit_id)
    return deposit


def process_deposit(deposit_id: str):
    deposit = db.get_deposit(deposit_id)
    if not deposit:
        raise Exception("Invalid deposit id")
    if deposit.processed:
        raise Exception("Payment already processed")

    response = fiat.get_payment_status(deposit_id)

    if response["transState"] == "00":
        token_amount = w3.convert_usd_to_qmdt(deposit.usd_amount)
        user_address = w3.get_user_account(deposit.user_id)
        token_address = TOKEN["qmgt"]
        tk = w3.to_checkum(token_address)
        param = TransferParams(token=tk, to=user_address, amount=token_amount)
        client_id = list(org_ids.ORG_IDS.keys())[0]
        res = w3.make_transfers(client_id, [param])
        state = transaction_states[response["transState"]]
        updates = {"processed": True, "state": state}
        db.update_deposit(deposit_id, updates)
        return res

    elif response["transState"] == "06":
        return True

    else:
        state = transaction_states[response["transState"]]
        updates = {"processed": True, "state": state}
        db.update_deposit(deposit_id, updates)
        return True
