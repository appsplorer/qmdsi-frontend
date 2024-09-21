import json
import requests
from datetime import datetime


def init_payment():
    url = "https://test.e-mango.ph/cashier/cashOut.do"
    data = {
        "signType": "SHA256",
        "timestamp": timestamp(),
        "merchSeq": "300000064604",
        "orderSeq": "Dunsds2sds",
        "orderDate": "2024-10-21",
        "amount": "2.00",
        "fee": "0.00",
        "currency": "PHP",
        "busiName": "QUANTUM METAL DIGITAL SOLUTION",
        "dueTime": "0",
        "busiType": "1",
        "notifyUrl": "https://test.e-mango.ph/cashier/pushtest",
        "isRedirect": "1",
        "redirectUrl": "https://www.e-mango.ph/",
        "additionInfo": {},
        "remark": "Dunno",
        "sign": "Dunno",
        "ipAddress": "",
    }
    res = requests.post(url, data=json.dumps(data))
    print(res.json())


def gen_signature():
    pass


def timestamp():
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")


init_payment()
