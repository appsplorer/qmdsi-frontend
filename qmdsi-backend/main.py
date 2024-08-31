from fastapi import FastAPI, Body, Header
from eth_typing import ChecksumAddress
from schemas import (
    PersonalInformation, 
    Nominee, 
    BaseUser, 
    Tokens,
    DebitSchema
)
import core, db, w3
from fastapi import FastAPI, Body, Header,HTTPException,Form, UploadFile,File
import constants
import face_recognition
import cv2
import exceptions
import os
import base64
from io import BytesIO
from PIL import Image
import numpy as np
import json
from fastapi.middleware.cors import CORSMiddleware
import cv2
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"message": "Hello, World!"}



@app.post("/signup")
def sign_up(
    user : BaseUser
):
    res = core.create_user(user)
    return res


@app.get("/user")
def get_a_user(address : str):
    return db.get_user(address)


@app.get("/refs")
def get_user_ref(address : str):
    user = db.get_user(address)
    if not user:
        return None 
    return db.user_refs(user.ref_link)


@app.post("/personal_information")
def post_personal_information(
    personal_info : PersonalInformation,
    address : ChecksumAddress = Body()
):
    print(personal_info)
    print(address)
    res = core.create_kyc_information(address, personal_info)
    return res



def detect_and_crop_face(image_path, output_path="output_img.png"):
    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30), flags=cv2.CASCADE_SCALE_IMAGE)
    if len(faces) == 0:
        raise ValueError("No face detected in the image.")
    
    x, y, w, h = faces[0]
    face_image = image[y:y+h, x:x+w]
    face_image_pil = Image.fromarray(cv2.cvtColor(face_image, cv2.COLOR_BGR2RGB))
    face_image_pil.save(output_path, format="PNG")
    return output_path

@app.post("/verify")
async def upload_image(image: str, 
                       uploaded_id_card_image: UploadFile = File(...),
                       walletAddress: ChecksumAddress = Form(...)):
    try:
        UPLOAD_DIR = 'uploads'
        os.makedirs(UPLOAD_DIR, exist_ok=True)
        file_location = os.path.join(UPLOAD_DIR, uploaded_id_card_image.filename)
        with open(file_location, "wb") as buffer:
            buffer.write(await uploaded_id_card_image.read())
        
        try:
            crop_img_from_id_card = detect_and_crop_face(file_location)
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))
        
        reference_image = face_recognition.load_image_file(crop_img_from_id_card)
        reference_encoding = face_recognition.face_encodings(reference_image)
        if not reference_encoding:
            raise HTTPException(status_code=400, detail="No face encoding found in ID card image.")
        
        image_data = base64.b64decode(image.split(",")[1])
        image = Image.open(BytesIO(image_data))
        rgb_image = image.convert("RGB")
        np_image = np.array(rgb_image)

        uploaded_image_encodings = face_recognition.face_encodings(np_image)
        if not uploaded_image_encodings:
            raise HTTPException(status_code=400, detail="No face found in the uploaded image.")

        # Compare the face encodings
        match = face_recognition.compare_faces([reference_encoding[0]], uploaded_image_encodings[0], tolerance=0.5)

        if match[0]:
            try:
                res = core.insert_user_id_pic(walletAddress, file_location)
                if os.path.exists(crop_img_from_id_card):
                       os.remove(crop_img_from_id_card)

                return {"status": "success", "message": "Face verification successful"}
            except Exception as e:
                  raise HTTPException(status_code=500, detail=str(e))
        else:
            return {"status": "failure", "message": "Face verification failed"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/personal_information")
def get_personal_information(address : str):
    res = db.get_personal_information(address) 
    return res


@app.post("/nominee")
def post_user_nominee(
    nominee : Nominee,
    address : ChecksumAddress = Body()
):
    res = core.create_nominee(address, nominee)
    return res


@app.get("/nominee")
def get_user_nominee(
    address : str
):
    return db.get_nominee(address)


@app.get("/bind")
def get_bind_status(address : str):
    return bool(db.get_binded_user(address))


@app.post("/bind")
def bind_account(
    address : str  = Body()
):
    return core.bind_user_account(address) 



@app.get("/balance")
def get_balance(
    address : str,
    token : Tokens
):
    token_address = constants.TOKEN.get(token)
    if not token_address:
         raise exceptions.BadRequestException("Personal Information already exists")
    balance = w3.check_balance(address, token_address)
    return balance



@app.post("/debit")
def debit_user(
    data : DebitSchema,
    x_token: str = Header(...)  
):
    hash = core.debit_user(x_token, data)
    return {"hash" : hash}


@app.post("/deposit")
def deposit_to_user(
    info : DebitSchema,
    x_token: str = Header(...)
):
    hash = core.deposit_to_user(x_token, info)
    return {"hash" : hash}
