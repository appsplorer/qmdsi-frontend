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
import logging
from typing import Any
import cv2
import exceptions
import imagehash

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

@app.post("/upload")
async def upload_file(profilePicture: UploadFile = File(...),
                      walletAddress: ChecksumAddress = Form(...)):
    try:
        print(profilePicture)
        print("wallet address:",walletAddress)
        UPLOAD_DIR = 'uploads'
        file_location = os.path.join(UPLOAD_DIR, walletAddress[:7].lower() + profilePicture.filename)
        os.makedirs(UPLOAD_DIR, exist_ok=True)
        with open(file_location, "wb") as buffer:
            buffer.write(await profilePicture.read())

        return {"status": "success", "message": "Id uploaded successfull"}
    except Exception as e:
        print(f"Error occurred: {e}")
        raise HTTPException(status_code=500, detail=str(e))



def detect_and_crop_face(image_path, resize= False,output_path = None):
    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    path = image_path
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30), flags=cv2.CASCADE_SCALE_IMAGE)
    if len(faces) == 0:
        raise ValueError("No face detected in the image.")
    
    x, y, w, h = faces[0]
    face_image = image[y:y+h, x:x+w]
    face_image_pil = Image.fromarray(cv2.cvtColor(face_image, cv2.COLOR_BGR2RGB))
    if resize:
        face_image_pil = face_image_pil.resize((128, 128), Image.Resampling.LANCZOS)
    if output_path:
        path = output_path
    face_image_pil.save(path, format="PNG")
    
    return path

def preprocess_image(image_path):
    image = Image.open(image_path)
    image = image.convert('L')  # Convert to grayscale
    image = image.resize((256, 256), Image.Resampling.LANCZOS)  # Resize to a fixed size
    return image


@app.post("/verify")
async def upload_image(image: UploadFile = File(...),
                       walletAddress:ChecksumAddress = Form(...)):
    try:
        folder = "screenshoot"
        UPLOAD_DIR = 'uploads'
        print("address", walletAddress)
        print(image.filename)
        image_path = os.path.join(folder, image.filename)
        os.makedirs(folder, exist_ok=True)
        with open(image_path,"wb") as buffer:
            buffer.write(await image.read())
        
        files = os.listdir(UPLOAD_DIR)
        matching_files = [f for f in files if f.startswith(walletAddress[:7].lower())]
        print(files)
        if not matching_files:
            return {"status": "notFound", "message": "Id card not found"} 
        
        id_image_path = os.path.join(UPLOAD_DIR, matching_files[0])
        id_card_image = detect_and_crop_face(id_image_path,resize=True,output_path=f"{walletAddress[:3].lower()}image.jpg")
        img = detect_and_crop_face(image_path,resize=True)
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
            #here goes the logic to insert the user id into the database, since the user have being verify successfully
            return {"status": "success", "message": "Face verification successful"}
        else:
            print("Images are different")
            return {"status": "failure", "message": "Face verification failed"}
            
    except Exception as e:
        print(f"Error occurred: {e}")
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
