ORG_IDS = {
    "0xF121F4cb555B32B17bf9f9d0F740BC2099668555" :  "efa10ad3cfd9271b9686933789e0f66b92c85e50acdb4ec0ea54f8ed8cc58e9b"
}


def get_ord_address(secret_key : str):
    for key, val in ORG_IDS.items():
        if val == secret_key:
            return key
    return None 
    