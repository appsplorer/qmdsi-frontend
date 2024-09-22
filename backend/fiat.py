import json
import requests
import hashlib
from datetime import datetime

key = "vfg98uu47jqgbuurr5u1eb67k20dv7d3"


def init_payment():
    url = "https://test.e-mango.ph/cashier/pay.do"
    data = {
        "signType": "SHA256",
        "timestamp": timestamp(),
        "merchSeq": "300000064604",
        "orderSeq": "Dunsds2sds",
        "orderDate": "2024-09-21",
        "amount": "2.00",
        "fee": "0.00",
        "currency": "PHP",
        "busiName": "Quantum Metal",
        "dueTime": "0",
        "busiType": "1",
        "notifyUrl": "https://test.e-mango.ph/cashier/pushtest",
        "isRedirect": "1",
        "redirectUrl": "https://www.e-mango.ph/",
        "additionInfo": {},
        "remark": "buy",
    }
    signature = gen_signature(data)
    data["sign"] = signature
    res = requests.post(url, data=json.dumps(data))
    print(res.json())


def gen_signature(data):
    sorted_data = dict(sorted(data.items()))
    processed = "&".join([f"{key}={value}" for key, value in sorted_data.items()])
    processed_with_key = processed + f"&{key}"
    signature = hashlib.sha256(processed_with_key.encode()).hexdigest()
    return signature


def timestamp():
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")


init_payment()
# data = {"OrderSeq": "200124531", "MerchSeq": "3000001", "OrderDate": "20230727"}
# gen_signature(data)
