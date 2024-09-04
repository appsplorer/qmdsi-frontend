ORG_IDS = {
    "NqkBjskB4sSsF8EYFp8EgR" :  "efa10ad3cfd9271b9686933789e0f66b92c85e50acdb4ec0ea54f8ed8cc58e9b"
}


def get_ord_id(secret_key : str):
    for key, val in ORG_IDS.items():
        if val == secret_key:
            return key
    return None 
    