import os
from dotenv import load_dotenv

load_dotenv()
env_url = os.getenv("FRONTEND_URL")
FRONTEND_URL = env_url if env_url else "http://localhost:5173"
OPENAI_API = os.getenv("API_KEY")