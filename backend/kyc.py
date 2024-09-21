import requests

url = "https://b2b-dev.idmetagroup.com/api/v1/verification/biometricsverification"

headers = {
    "Authorization": "Bearer 20|xXGK3AELfoxV5EqAqAzk5lh2uLWd3voWVUQCgLz7906d449f",
    "accept": "application/json",
}
files = {
    "image": open("1.jpg", "rb"),
    "template_id": (None, "265"),
    "verification_id": (None, "38aa0e75-6a04-410f-93a0-ea7d3c5ef486"),
}

response = requests.post(url, headers=headers, files=files)
print(response.status_code, response.json())
