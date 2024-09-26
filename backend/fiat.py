import json
import requests
import hashlib
from datetime import datetime
import yfinance as yf  # type: ignore
from cache import CacheWithTTL
from config import FRONTEND_URL, NOTIFY_URL

cache = CacheWithTTL(ttl_seconds=300)
# Merchant key for signing


key = "vfg98uu47jqgbuurr5u1eb67k20dv7d3"
url = "https://test.e-mango.ph/cashier/qrPay.do"
query_url = "https://test.e-mango.ph/cashier/qryOrder.do"
headers = {"Content-Type": "application/json"}


def get_rate():
    cached = cache.get("rate")
    if cached:
        return float(cached)

    data = yf.Ticker("PHPUSD=X")
    current_rate = data.history(period="1d")["Close"].iloc[-1]
    cache.set("rate", float(current_rate))
    return float(current_rate)


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
        "dueTime": "30",
        "busiType": "1",
        "notifyUrl": NOTIFY_URL,
        "isRedirect": "1",
        "redirectUrl": f"{FRONTEND_URL}/deposits/{orderId}",
        "additionInfo": json.dumps({}),
        "remark": "Fiat deposit",
    }

    signature = gen_signature(data)
    data["sign"] = signature

    res = requests.post(url, data=json.dumps(data), headers=headers)

    if res.status_code == 200:
        data = res.json()
        if data["respCode"] != "00000000":
            raise Exception(data.get("respMessage"))
        return data["url"]
    else:
        raise Exception("Error initializing payment")


def get_payment_status(
    payment_id: str,
):
    data = {
        "signType": "SHA256",
        "merchSeq": "300000064604",
        "orderSeq": payment_id,
        "timestamp": timestamp(),
    }
    signature = gen_signature(data)
    data["sign"] = signature
    res = requests.post(query_url, data=json.dumps(data), headers=headers)

    if res.status_code == 200:
        data = res.json()
        if data["respCode"] != "00000000":
            raise Exception(data.get("respMessage"))
        return data
    else:
        raise Exception("Error getting payment status")
