from web3 import Web3
from abis.qmdsi_admin import qmdsi_admin_abi
from abis.token_abi import token_abi

url = "https://bsc-testnet-rpc.publicnode.com"
w3  = Web3(Web3.HTTPProvider(url))
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
