from fastapi import (
    FastAPI,
    Header,
    UploadFile,
    File,
    Depends,
    HTTPException,
    status,
    Request,
)
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from schemas import (
    PersonalInformation,
    Nominee,
    DebitSchema,
    RegUser,
    DBUser,
    SwapParams,
    TransferSchema,
    BindRequestSchema,
    BuyGoldSchema,
    SellGoldSchema,
    ForgetPassowrd,
    ResetUserPassword,
)
import cv2
import os
import core, db, w3
from authkyc import (
    get_id_no_and_fullname_from_id_card,
    name_contains,
    detect_and_crop_face,
)
import constants
import exceptions
import security
import emails
from security import Jwt

from dependencies import current_user
from exceptions import BadRequest
import org_ids
import config
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

date_format = "%Y-%m-%d"


@app.get("/")
async def read_root():
    return {"status": "up"}


@app.post("/signup")
def sign_up(user: RegUser):
    email_user = db.get_user_by_email(user.email)
    if email_user:
        raise exceptions.BadRequest("Email already in use")
    phone_user = db.get_user_by_phone(user.phone_number)
    if phone_user:
        raise exceptions.BadRequest("Phone number already in use")
    res = core.create_user(user)
    return res


@app.post("/login")
def login_user(request_form: OAuth2PasswordRequestForm = Depends()):
    user = db.get_user_by_email(request_form.username)
    print(request_form.username)
    if not user:
        raise exceptions.BadRequest("Invalid credentials")
    is_valid_password = security.verify_password(request_form.password, user.password)
    if not is_valid_password:
        raise exceptions.BadRequest("Invalid credentials")
    acces_token = Jwt.get_access_token(user.id)
    return {"access_token": acces_token}


@app.post("/forget_password")
def forget_password(data: ForgetPassowrd):
    user = db.get_user_by_email(data.email)

    if not user:
        raise BadRequest("User not found")

    token = Jwt.encode_reset_password(data.email)

    link = f"{config.FRONTEND_URL}/reset_password?token={token}"
    print(link)
    emails.send_forgot_password_email(data.email, link)
    return True


@app.post("/reset_password")
def reset_user_password(data: ResetUserPassword):
    return core.reset_password(data)


@app.get("/user")
def get_a_user(user: DBUser = Depends(current_user)):
    raw_user = user.model_dump()
    wallet_address = w3.get_user_account(user.id)
    del raw_user["password"]
    raw_user["wallet_address"] = wallet_address
    raw_user["referral_sign_ups"] = db.user_refs(user.ref_link)
    return raw_user


@app.post("/verify")
async def upload_image(
    image: UploadFile = File(...), user: DBUser = Depends(current_user)
):
    try:
        print(user)
        folder = os.path.join(os.path.dirname(__file__), "screenshoot")
        UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "uploads")
        if not os.path.exists(UPLOAD_DIR):
            return exceptions.BadRequestException("Id card image not found")
        print(image.filename)
        image_path = os.path.join(folder, user.id + image.filename)
        os.makedirs(folder, exist_ok=True)
        with open(image_path, "wb") as buffer:
            buffer.write(await image.read())
        files = os.listdir(UPLOAD_DIR)
        user_uploaded_image = [file for file in files if file.startswith(user.id)]
        if not user_uploaded_image:
            return exceptions.BadRequestException("Id card image not found")
        id_image_file_path = os.path.join(UPLOAD_DIR, user_uploaded_image[0])
        id_card_image = detect_and_crop_face(
            id_image_file_path, resize=True, output_path=f"{user.id}image.jpg"
        )
        img = detect_and_crop_face(image_path, resize=True)
        image1 = cv2.imread(id_card_image, cv2.IMREAD_GRAYSCALE)
        image2 = cv2.imread(img, cv2.IMREAD_GRAYSCALE)

        sift = cv2.SIFT_create()
        kp1, des1 = sift.detectAndCompute(image1, None)
        kp2, des2 = sift.detectAndCompute(image2, None)

        bf = cv2.BFMatcher(cv2.NORM_L2, crossCheck=True)
        matches = bf.match(des1, des2)
        matches = sorted(matches, key=lambda x: x.distance)

        similarity_score = len(matches) / min(len(kp1), len(kp2))
        print(f"Similarity score: {similarity_score}")

        if similarity_score > 0.5:  # Threshold for similarity
            print("Images are similar")
            if os.path.exists(id_card_image):
                os.remove(id_card_image)
            if os.path.exists(img):
                os.remove(img)
            try:
                res = core.update_user_kyc_verify_column(user.id)
            except Exception as e:
                print(f"Error occurred: {e}")
                raise HTTPException(status_code=500, detail=str(e))
            # here goes the logic to insert the user id into the database, since the user have being verify successfully
            return {"status": "success", "message": "Face verification successful"}
        else:
            print("Images are different")
            return {"status": "failure", "message": "Face verification failed"}

    except Exception as e:
        print(f"Error occurred: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/refs")
def get_user_ref(user: DBUser = Depends(current_user)):
    return db.user_refs(user.ref_link)


@app.post("/personal_information")
def post_personal_information(
    personal_info: PersonalInformation,
    user: DBUser = Depends(current_user),
):
    try:
        print(personal_info)
        personal_info_data = core.get_personal_info(user.id)
        if personal_info_data:
            print(personal_info_data)
            res = core.update_kyc_information(user.id, personal_info)
            return res

        res = core.create_kyc_information(user.id, personal_info)
        return res
    except Exception as e:
        print(f"Error occurred: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/swap")
def swap_token(swap: SwapParams, user: DBUser = Depends(current_user)):
    if swap.amount_in <= 0:
        raise exceptions.BadRequestException("Invalid amountIn")
    # try:
    res = core.swap(user.id, swap.token_in, swap.amount_in)
    return {"hash": res}
    # except Exception as e:
    #     print(e)
    #     raise exceptions.BadRequestException(f"Error occured {e}")


@app.post("/personal_information/images")
async def upload_kyc_images(
    profilePic: UploadFile = File(...),
    personalId: UploadFile = File(...),
    proofOfAddress:UploadFile = File(...),
    user: DBUser = Depends(current_user),
):
    try:
        personal_info = core.get_personal_info(user.id)
        if not personal_info:
            raise exceptions.BadRequestException(
                "Personal information doesn't exist,submit the form and try again."
            )
        UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "uploads")
        os.makedirs(UPLOAD_DIR, exist_ok=True)
        image_path = os.path.join(UPLOAD_DIR, user.id + personalId.filename)
        with open(image_path, "wb") as buffer:
            buffer.write(await personalId.read())
        fullname, id_number, dob = get_id_no_and_fullname_from_id_card(image_path)
        if not fullname:
            raise exceptions.BadRequestException("Unable to extract info from ID,upload clean ID and try again")
        elif not dob:
            raise exceptions.BadRequestException("Unable to extract info from ID,upload clean ID and try again")
        elif not id_number:
            raise exceptions.BadRequestException("Unable to extract info from ID,upload clean ID and try again")

        id_card_dob = datetime.strptime(dob, date_format)
        user_dob = datetime.strptime(personal_info.date_of_birth, date_format)

        if not name_contains(personal_info.name, fullname):
            raise exceptions.BadRequestException(
                "Your kyc name doesn't match with the id card uploaded,update your kyc information and try again"
            )
        if str(personal_info.id_number) not in id_number:
            raise exceptions.BadRequestException(
                "Your kyc id number doesn't match with the id card uploaded,update your kyc information and try again"
            )
        if id_card_dob != user_dob:
            raise exceptions.BadRequestException(
                "Your kyc date of birth doesn't match with the id card uploaded,update your kyc information and try again"
            )
        return True

    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@app.get("/personal_information")
def get_personal_information(user: DBUser = Depends(current_user)):
    res = core.get_personal_info(user.id)
    return res


@app.post("/nominee")
def post_user_nominee(nominee: Nominee, user: DBUser = Depends(current_user)):
    try:
        
        existing_nominee = db.get_nominee(user.id)

        if existing_nominee:
            return db.update_nominee_info(user.id, nominee)

        res = core.create_nominee(user.id, nominee)
        return res
    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@app.post("/nominee/image")
async def upload_nominee_id_image(personalId: UploadFile = File(...),
                            user: DBUser = Depends(current_user)):
    try:
        nominee_info = db.get_nominee(user.id)
        print(nominee_info)
        if not nominee_info:
            raise exceptions.BadRequestException(
                "Nominee information doesn't exist,submit the form and try again."
            )
        UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "uploads/nominees")
        os.makedirs(UPLOAD_DIR, exist_ok=True)
        image_path = os.path.join(UPLOAD_DIR, user.id + personalId.filename)
        with open(image_path, "wb") as buffer:
            buffer.write(await personalId.read())
        fullname, id_number, dob = get_id_no_and_fullname_from_id_card(image_path)
        if not fullname:
            raise exceptions.BadRequestException("Unable to extract info from ID,upload clean ID and try again")
        elif not dob:
            raise exceptions.BadRequestException("Unable to extract info from ID,upload clean ID and try again")
        elif not id_number:
            raise exceptions.BadRequestException("Unable to extract info from ID,upload clean ID and try again")

        id_card_dob = datetime.strptime(dob, date_format)
        user_dob = datetime.strptime(nominee_info.date_of_birth, date_format)
        nominee_fullname = nominee_info.first_name + " " + nominee_info.middle_name + " " + nominee_info.last_name
        print(nominee_fullname)
        
        if not name_contains(nominee_fullname, fullname):
            raise exceptions.BadRequestException(
                "Your Nominee name doesn't match with the id card uploaded,update your Nominee information and try again"
            )
        print(nominee_info.id_number)
        print(id_number)
        if str(nominee_info.id_number) not in id_number:
            raise exceptions.BadRequestException(
                "Your Nominee id number doesn't match with the id card uploaded,update your Nominee information and try again"
            )
        if id_card_dob != user_dob:
            raise exceptions.BadRequestException(
                "Your Nominee date of birth doesn't match with the id card uploaded,update your Nominee information and try again"
            )
        try:
            res = core.update_user_kyc_verify_column(user.id)
            if res:
                return res
        except Exception as e:
            print(e)
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
        

    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@app.get("/nominee")
def get_user_nominee(user: DBUser = Depends(current_user)):
    return db.get_nominee(user.id)


@app.get("/api/account/bind")
def get_bind_status(
    user_id: str,
    x_token: str = Header(...),
):
    return bool(db.get_binded_user(user_id))


@app.post("/api/account/binding")
def bind_account(
    data: BindRequestSchema,
    x_token: str = Header(...),
):
    org_id = org_ids.get_ord_id(x_token)
    if not org_id:
        raise exceptions.BadRequest("Invalid token")
    return core.bind_user_account(data.identificationNumber)


@app.get("/api/account/balance")
def get_balance(userId: str):
    balances = {}
    for item in constants.TOKEN.items():
        balances[item[0]] = w3.check_balance(userId, item[1])
    return balances


@app.post("/api/account/transfer")
def transfer_token(data: TransferSchema, x_token: str = Header(...)):
    hash = core.transfer(x_token, data)
    return {"hash": hash}


@app.post("/api/account/debit")
def debit_user(data: DebitSchema, x_token: str = Header(...)):
    hash = core.debit_user(x_token, data)
    return {"hash": hash}


@app.post("/api/account/deposit")
def deposit_to_user(info: DebitSchema, x_token: str = Header(...)):
    hash = core.deposit_to_user(x_token, info)
    return {"hash": hash}


@app.post("/api/gold/buy")
def buy_gold(data: BuyGoldSchema, x_token: str = Header(...)):
    return core.buy_gold(data, x_token)


@app.post("/api/gold/sell")
def sell_gold(data: SellGoldSchema, x_token: str = Header(...)):
    return core.sell_gold(data, x_token)
