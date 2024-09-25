import json
import requests
import hashlib
from datetime import datetime
from decimal import Decimal
import shortuuid

# Merchant key for signing
key = "vfg98uu47jqgbuurr5u1eb67k20dv7d3"
url = "https://test.e-mango.ph/cashier/pay.do"


def current_date():
    return datetime.now().strftime("%Y-%m-%d")


def timestamp():
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def gen_signature(data):
    sorted_data = dict(sorted(data.items()))
    processed = "&".join([f"{key}={value}" for key, value in sorted_data.items()])
    processed_with_key = processed + f"&{key}"
    signature = hashlib.sha256(processed_with_key.encode()).hexdigest()
    return signature


def init_payment(
    orderId: str,
    amount: float,
):

    data = {
        "signType": "SHA256",
        "timestamp": timestamp(),
        "merchSeq": "300000064604",
        "orderSeq": orderId,
        "orderDate": current_date(),
        "amount": str(amount),
        "fee": "0.00",
        "currency": "PHP",
        "busiName": "Quantum Metal",
        "dueTime": "0",
        "busiType": "1",
        "notifyUrl": "https://test.e-mango.ph/cashier/pushtest",
        "isRedirect": "0",
        # "redirectUrl": "https://www.e-mango.ph/",
        "additionInfo": json.dumps({}),
        "remark": "buy",
        "firstName": "Mover",
        "middleName": "Elite",
        "lastName": "DEV",
    }

    # Generate the signature
    signature = gen_signature(data)
    data["sign"] = signature
    print("Generated Signature:", signature)

    headers = {"Content-Type": "application/json"}
    res = requests.post(url, data=json.dumps(data), headers=headers)

    if res.status_code == 200:
        print("Response:", res.json())
    else:
        print(f"Error: {res.status_code}, {res.text}")


# Run the payment initialization
uid = shortuuid.uuid()
init_payment(uid, 200)
