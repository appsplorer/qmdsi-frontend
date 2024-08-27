from web3 import Web3
from abis.qmdsi_admin import qmdsi_admin_abi
from abis.token_abi import token_abi

url = "https://bsc-testnet-rpc.publicnode.com"
w3  = Web3(Web3.HTTPProvider(url))
admin_key = "af7c3b6a2c12efea7a84eb56500845c9bf35b06e0ef74ee61bbaa7af4fbdb811"
admin_account = w3.eth.account.from_key(admin_key)
qmdsi_admin_address = w3.to_checksum_address("0x3e4c291c1465389a1e2cd36677014c0ebf6a71ad")
qmdsi_admin_contract = w3.eth.contract(address=qmdsi_admin_address, abi=qmdsi_admin_abi)



def check_balance(address : str, token_address : str ):
    check_summed = w3.to_checksum_address(address)
    token_address = w3.to_checksum_address(token_address)
    wallet_address = qmdsi_admin_contract.functions.getUserAccount(check_summed).call()
    token_contract = w3.eth.contract(token_address, abi=token_abi)
    decimals = token_contract.functions.decimals().call()
    balance_wei = token_contract.functions.balanceOf(wallet_address).call()
    return balance_wei /  10**decimals



def get_token_balance(address: str, token_address : str):
    token_address = to_checkum(token_address)
    address = to_checkum(address)
    
    token_contract = w3.eth.contract(token_address, abi=token_abi)
    return token_contract.functions.balanceOf(address).call()




def get_user_account(address : str):
    check_summed = w3.to_checksum_address(address)
    wallet_address = qmdsi_admin_contract.functions.getUserAccount(check_summed).call()
    return w3.to_checksum_address(wallet_address)
    
    
def token_amount_to_wei(token_address : str, amount : float):
    token_address = w3.to_checksum_address(token_address)
    token_contract = w3.eth.contract(token_address, abi=token_abi)
    decimals = token_contract.functions.decimals().call()
    return int(amount * 10**decimals)


def to_checkum(address : str):
    return w3.to_checksum_address(address)


def make_transfers(from_address : str, transfer_params : list[dict]):
    from_account = get_user_account(from_address)
    code = w3.eth.get_code(from_account)
    gas_price =  w3.eth.gas_price
    from_address = w3.to_checksum_address(from_address)
    
    if not code:
        nonce =  w3.eth.get_transaction_count(admin_account.address)

        print("Code not found")
        tx_params = qmdsi_admin_contract.functions.initAccount(from_address).build_transaction({
                    "from": admin_account.address,
                    "nonce" : nonce,
                    "gasPrice" :gas_price,
                })
        signed_tx =  admin_account.sign_transaction(tx_params)
        hash  = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
        print(f"Init Transaction hash  {hash.hex()}")
        w3.eth.wait_for_transaction_receipt(hash)

    nonce =  w3.eth.get_transaction_count(admin_account.address)
    tx_params = qmdsi_admin_contract.functions.transferTokens(from_address, transfer_params).build_transaction({
                                            "from": admin_account.address,
                                            "nonce" : nonce,
                                            "gasPrice" :gas_price,
                                        })
    signed_tx =  admin_account.sign_transaction(tx_params)
    hash  = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
    print(f"Transfer Transaction hash  {hash.hex()}")
    w3.eth.wait_for_transaction_receipt(hash)
    return hash.hex()