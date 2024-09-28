from web3 import Web3


def to_checkum(address: str):
    return Web3.to_checksum_address(address)
