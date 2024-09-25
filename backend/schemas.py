from pydantic import BaseModel, EmailStr, Field, AliasChoices
from enum import Enum
import shortuuid
from io import BytesIO
from datetime import datetime


class Tokens(str, Enum):
    qmgt = "qmgt"
    usdt = "usdt"


class BaseUser(BaseModel):
    first_name: str = Field(
        ..., validation_alias=AliasChoices("firstName", "first_name")
    )
    last_name: str = Field(..., validation_alias=AliasChoices("lastName", "last_name"))
    middle_name: str = Field(
        ..., validation_alias=AliasChoices("middleName", "middle_name")
    )

    country: str
    phone_number: str = Field(
        ..., validation_alias=AliasChoices("phoneNumber", "phone_number")
    )
    email: EmailStr
    ref_by: str | None = Field(..., validation_alias=AliasChoices("refBy", "ref_by"))


class LoginUser(BaseModel):
    email: str
    password: str


class RegUser(BaseUser):
    password: str
    pin: int


class DBUser(RegUser):
    id: str = Field(..., default_factory=shortuuid.uuid)
    ref_link: str = Field(..., default_factory=shortuuid.uuid)
    kyc_verified: bool | None = None
    email_verified: bool | None = None
    created_at: str | None = None


class PersonalInformation(BaseModel):
    first_name: str = Field(
        ..., validation_alias=AliasChoices("firstName", "first_name")
    )
    middle_name: str = Field(
        ..., validation_alias=AliasChoices("middleName", "middle_name")
    )
    last_name: str = Field(..., validation_alias=AliasChoices("lastName", "last_name"))
    employee_name: str = Field(
        ..., validation_alias=AliasChoices("employeeName", "employee_name")
    )
    income_per_annum: float = Field(
        ..., validation_alias=AliasChoices("incomePerAnnum", "income_per_annum")
    )
    date_of_birth: str = Field(
        ..., validation_alias=AliasChoices("dateOfBirth", "date_of_birth")
    )
    address: str
    city: str
    postal_code: str = Field(
        ..., validation_alias=AliasChoices("postalCode", "postal_code")
    )
    country: str
    citizenship: str
    currency: str
    mother_name: str = Field(
        ..., validation_alias=AliasChoices("motherName", "mother_name")
    )
    income_tax_no: int = Field(
        ..., validation_alias=AliasChoices("incomeTaxNo", "income_tax_no")
    )
    id_type: str = Field(..., validation_alias=AliasChoices("idType", "id_type"))
    id_number: str = Field(..., validation_alias=AliasChoices("idNumber", "id_number"))
    industry: str
    occupation: str
    source_of_income: str = Field(
        ..., validation_alias=AliasChoices("sourceOfIncome", "source_of_income")
    )
    mobile_phone: str = Field(
        ..., validation_alias=AliasChoices("mobilePhone", "mobile_phone")
    )
    phone_2: str = Field(..., validation_alias=AliasChoices("phone2", "phone_2"))
    fax_no: str = Field(..., validation_alias=AliasChoices("faxNo", "fax_no"))
    marital_status: str = Field(
        ..., validation_alias=AliasChoices("maritalStatus", "marital_status")
    )
    gender: str


class Refs(BaseModel):
    created_at: str
    email: EmailStr


class Nominee(BaseModel):
    first_name: str = Field(
        ..., validation_alias=AliasChoices("firstName", "first_name")
    )
    middle_name: str = Field(
        ..., validation_alias=AliasChoices("middleName", "middle_name")
    )
    last_name: str = Field(..., validation_alias=AliasChoices("lastName", "last_name"))
    date_of_birth: str = Field(
        ..., validation_alias=AliasChoices("dateOfBirth", "date_of_birth")
    )
    address: str
    city: str
    postal_code: str = Field(
        ..., validation_alias=AliasChoices("postalCode", "postal_code")
    )
    country: str
    relationship_to_testator: str = Field(
        ...,
        validation_alias=AliasChoices(
            "relationshipToTestator", "relationship_to_testator"
        ),
    )
    contact_info: str = Field(
        ..., validation_alias=AliasChoices("contactInfo", "contact_info")
    )
    id_type: str = Field(..., validation_alias=AliasChoices("idType", "id_type"))
    id_number: str = Field(..., validation_alias=AliasChoices("idNumber", "id_number"))


class SwapParams(BaseModel):
    token_in: Tokens = Field(..., validation_alias=AliasChoices("tokenIn", "token_in"))
    amount_in: float = Field(..., validation_alias=AliasChoices("amountIn"))


class BindResult(BaseModel):
    status: str
    walletAddress: str


class DebitSchema(BaseModel):
    token: Tokens
    id: str
    amount: float


class TransferSchema(BaseModel):
    toAccount: str
    fromAccount: str
    amountInUSD: str


class BindRequestSchema(BaseModel):
    identificationNumber: str


class BuyGoldSchema(BaseModel):
    userId: str
    aurumWalletPin: str
    amountUSD: float
    gcaOption: bool


class SellGoldSchema(BaseModel):
    userId: str
    walletAddress: str
    amountQMGT: float


class ForgetPassowrd(BaseModel):
    email: EmailStr


class ResetUserPassword(BaseModel):
    password: str
    token: str


class IdDocumentInfo(BaseModel):
    first_name: str | None = None
    middle_name: str | None = None
    last_name: str | None = None
    date_of_birth: datetime | None = None
    front_image: bytes | None = None


class VerficationData(BaseModel):
    id: str
    user_id: str
    credentials_verified: bool
    completed: bool
