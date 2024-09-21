from typing import Annotated
from fastapi import  Depends, HTTPException, status
from fastapi.security import (
    HTTPBearer,
    OAuth2PasswordBearer,
)
from security import Jwt
from db import get_user
from exceptions import BadRequest
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
    
    

# def admin_user(
#     token: Annotated[str, Depends(oauth2_scheme)],
# ):
#     user = current_user(token)
#     if not user.is_admin:
#         raise BadRequest("Admin only")
    
#     return user    
