from web3 import Web3
from eth_typing import ChecksumAddress
from abis.qmdsi_admin import qmdsi_admin_abi
from abis.token_abi import token_abi
from abis.swap_abi import swap_abi
from schemas import TransferParams

url = "https://bsc-testnet-rpc.publicnode.com"
w3 = Web3(Web3.HTTPProvider(url))

admin_key = "af7c3b6a2c12efea7a84eb56500845c9bf35b06e0ef74ee61bbaa7af4fbdb811"
usdt_ddress = w3.to_checksum_address("0xbf5564f8799566784d4031839613aeeb5b7bba5a")
token_address = "0x1359899ab37623c8ddf07dcd2295a50cd6db549a"
swap_address = w3.to_checksum_address("0x4a200cfaee47ef49bd94173a7541a88a8dbc583a")
admin_account = w3.eth.account.from_key(admin_key)

qmdsi_admin_address = w3.to_checksum_address(
    "0x2c4528c5d7bf6115e377d8652bce19dd1f058fc5"
)
qmdsi_admin_contract = w3.eth.contract(address=qmdsi_admin_address, abi=qmdsi_admin_abi)
swap_contract = w3.eth.contract(address=swap_address, abi=swap_abi)


def get_token_decimals(token_address: ChecksumAddress) -> int:
    token_contract = w3.eth.contract(address=token_address, abi=token_abi)
    decimals = token_contract.functions.decimals().call()
    return decimals


def convert_usd_to_qmdt(usdt_amount: float):
    token_contract = w3.eth.contract(address=usdt_ddress, abi=token_abi)
    decimals = token_contract.functions.decimals().call()
    usdt_amount_wei = int(usdt_amount * 10**decimals)
    return swap_contract.functions.getQmgtAmount(usdt_amount_wei).call()


def check_balance(_id: str, token_address: str):

    token_address = w3.to_checksum_address(token_address)
    wallet_address = qmdsi_admin_contract.functions.getUserAccount(_id).call()
    token_contract = w3.eth.contract(token_address, abi=token_abi)
    decimals = token_contract.functions.decimals().call()
    balance_wei = token_contract.functions.balanceOf(wallet_address).call()
    return balance_wei / 10**decimals


def check_balance_raw(_id: str, token_address: str):
    token_address = w3.to_checksum_address(token_address)
    wallet_address = qmdsi_admin_contract.functions.getUserAccount(_id).call()
    token_contract = w3.eth.contract(token_address, abi=token_abi)
    balance_wei = token_contract.functions.balanceOf(wallet_address).call()
    return balance_wei


def get_token_balance(address: str, token_address: str):
    tk_address = to_checkum(token_address)
    wallet_address = to_checkum(address)

    token_contract = w3.eth.contract(address=tk_address, abi=token_abi)
    return token_contract.functions.balanceOf(wallet_address).call()


def get_user_account(_id: str):

    wallet_address = qmdsi_admin_contract.functions.getUserAccount(_id).call()
    return w3.to_checksum_address(wallet_address)


def token_amount_to_wei(token_address: str, amount: float):
    token_address = w3.to_checksum_address(token_address)
    token_contract = w3.eth.contract(token_address, abi=token_abi)
    decimals = token_contract.functions.decimals().call()
    return int(amount * 10**decimals)


def to_checkum(address: str):
    return w3.to_checksum_address(address)


def make_transfers(from_id: str, transfer_params: list[TransferParams]):
    gas_price = w3.eth.gas_price
    params = [param.model_dump() for param in transfer_params]
    nonce = w3.eth.get_transaction_count(admin_account.address)
    tx_params = qmdsi_admin_contract.functions.transferTokens(
        from_id, params
    ).build_transaction(
        {
            "from": admin_account.address,
            "nonce": nonce,
            "gasPrice": gas_price,
        }
    )
    signed_tx = admin_account.sign_transaction(tx_params)
    hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
    print(f"Transfer Transaction hash  {hash.hex()}")
    w3.eth.wait_for_transaction_receipt(hash)
    return hash.hex()


def swap(user_id: str, token_in: str, amount_in: int):

    if token_in == "usdt":
        func = qmdsi_admin_contract.functions.buyQmgt(user_id, amount_in)
    else:
        func = qmdsi_admin_contract.functions.sellQmgt(user_id, amount_in)
    nonce = w3.eth.get_transaction_count(admin_account.address)
    gas_price = w3.eth.gas_price
    tx_params = func.build_transaction(
        {
            "from": admin_account.address,
            "nonce": nonce,
            "gasPrice": gas_price,
        }
    )
    signed_tx = admin_account.sign_transaction(tx_params)
    hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
    print(f"Transfer Transaction hash  {hash.hex()}")
    w3.eth.wait_for_transaction_receipt(hash)
    return hash.hex()
