from typing import Annotated
from fastapi import Depends, HTTPException, status, Header
from fastapi.security import (
    HTTPBearer,
    OAuth2PasswordBearer,
)
from security import Jwt
from db import get_user
from org_ids import get_ord_id

security = HTTPBearer()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    payload = Jwt.decode_access_token(token)
    print("decoding access token")
    _id: str | None = payload.get("sub")
    print(_id)
    if _id is None:
        raise credentials_exception
    current_user = get_user(_id)
    if current_user is None:
        raise credentials_exception
    return current_user


def current_org(
    x_token: str = Header(...),
):
    org_id = get_ord_id(x_token)
    if not org_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid x_token token",
        )
    return x_token


# def admin_user(
#     token: Annotated[str, Depends(oauth2_scheme)],
# ):
#     user = current_user(token)
#     if not user.is_admin:
#         raise BadRequest("Admin only")

#     return user
