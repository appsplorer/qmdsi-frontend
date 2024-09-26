import os, sys
from dotenv import load_dotenv

load_dotenv()
env_url = os.getenv("FRONTEND_URL")
env_notify_url = os.getenv("NOTIFY_URL")

if not env_notify_url:
    print("Notify url not set in env")
    sys.exit()
if not env_url:
    print("Frontend url not set in env")
    sys.exit()

FRONTEND_URL = env_url
NOTIFY_URL = env_notify_url
