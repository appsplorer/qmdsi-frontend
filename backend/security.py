from datetime import datetime, timedelta
from jose import JWTError, ExpiredSignatureError, jwt  # type: ignore
from passlib.context import CryptContext  # type: ignore

from exceptions import Unauthenticated
from typing import Any

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

JWT_SECRET = "5037dc30e1fab2a37fed0916fac29b98b0042a58158621c734df4eb2dbe4f17d"
JWT_ALGORITHM = "HS256"


class Jwt:
    @staticmethod
    def _encode_token(claims: dict[str, Any]) -> str:
        return jwt.encode(claims, JWT_SECRET, algorithm=JWT_ALGORITHM)

    @staticmethod
    def _decode_token(
        token: str, is_access: bool, expiry_msg: str = "Session expired"
    ) -> dict[str, Any]:
        try:
            payload = jwt.decode(
                token,
                JWT_SECRET,
                algorithms=[JWT_ALGORITHM],
            )
            if is_access != payload["access"]:
                raise Unauthenticated("Invalid Credentials")

            return payload

        except ExpiredSignatureError:
            raise Unauthenticated(expiry_msg)
        except JWTError as e:
            print(e)
            raise Unauthenticated("Could not validate credentials")

    @classmethod
    def get_access_token(cls, sub: Any) -> str:

        to_encode = {"sub": sub, "access": True}
        return cls._encode_token(to_encode)

    @classmethod
    def decode_access_token(cls, token: str) -> dict[str, Any]:
        return cls._decode_token(token, is_access=True)

    @classmethod
    def encode_reset_password(cls, email: str):
        expire = datetime.utcnow() + timedelta(minutes=15)
        to_encode = {"sub": email, "exp": expire, "access": False}
        return cls._encode_token(to_encode)

    @classmethod
    def decode_reset_password(cls, token):
        return cls._decode_token(token, is_access=False, expiry_msg="Link expired")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)
