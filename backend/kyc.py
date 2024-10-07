import requests
import os
import base64
from io import BytesIO
from PIL import Image
from schemas import IdDocumentInfo, PersonalInformation
import shutil
from typing import BinaryIO
import db, json
from datetime import datetime

# url = "https://b2b-dev.idmetagroup.com/api/v1/verification/biometricsverification"
url = "https://integrate.idmetagroup.com/api/v1/verification/create-verification"
upload_dir = "uploads"

headers = {
    "Authorization": "Bearer 8|wsbOhcmUfO9RKOkwQgp725ozIP8miQ2UhlpbW9PSeb64f0e0",
    "accept": "application/json",
}

template_id = 94
face_comparison_threshold = 70


def init_verification(user_id: str):
    verification = db.get_user_verification(user_id)
    if verification:
        print("Already exists")
        return verification.id

    data = {"template_id": template_id}
    res = requests.post(
        "https://integrate.idmetagroup.com/api/v1/verification/create-verification",
        data=data,
        headers=headers,
    )
    veridfication_id = res.json()["verification"]["id"]
    db.create_verification(str(veridfication_id), user_id)
    return str(veridfication_id)


def verify_document(
    verification_id: str,
    id_path: str,
) -> IdDocumentInfo:
    try:
        data2 = {
            "returnFaceImage": True,
            "returnFullDocumentImage": False,
            "document_verify": True,
            "template_id": template_id,
            "verification_id": verification_id,
        }
        files = {
            "imageFrontSide": open(id_path, "rb"),
        }

        res = requests.post(
            "https://integrate.idmetagroup.com/api/v1/verification/document_verification",
            data=data2,
            headers=headers,
            files=files,
        )
        data = res.json()
        # print(data)
        visual_check = data["result"]["data"]["extractionResult"]
        return extract_info(visual_check)
    except Exception as e:
        print(e)
        raise Exception("Unable to verify document, ensure it's a valid document")


def compare_faces(
    verification_id: str,
    face_one: BinaryIO,
    face_two: BinaryIO,
):
    data = {
        "template_id": 54,
        "verification_id": verification_id,
    }
    files = {
        "image1": face_one,
        "image2": face_two,
    }
    res = requests.post(
        "https://integrate.idmetagroup.com/api/v1/verification/biometricsfacecompare",
        data=data,
        headers=headers,
        files=files,
    )
    data = res.json()
    if not data.get("status", False):
        erro_msg = data.get("message", "Error comparing faces")
        print(erro_msg)
        raise Exception(erro_msg)
    result = data["result"]
    if isinstance(result, dict):
        return int(result.get("score", 0))
    else:
        return 0


def complete_verification(
    verification_id: str,
):
    data = {"template_id": template_id, "verification_id": verification_id}
    res = requests.post(
        "https://integrate.idmetagroup.com/api/v1/verification/finalize-verification",
        data=data,
        headers=headers,
    )

    data = res.json()
    if data.get("status") == "REVIEW_NEEDED":
        raise Exception("Manual review needed")


def extract_info(document_info: dict) -> IdDocumentInfo:
    full_name = document_info.get("fullName")
    first_name = document_info.get("firstName")
    last_name_obj = document_info.get("lastName")
    date_of_birth_obj = document_info.get("dateOfBirth")
    face_image_base64_string = document_info.get("faceImageBase64")
    document_number = document_info.get("documentNumber")
    result = IdDocumentInfo()

    if full_name:
        first_name, *middle_name, last_name = full_name["latin"].split(" ")
        middle_name = " ".join(middle_name)
        if first_name.endswith(","):
            result.last_name = first_name.strip(",")
            result.first_name = middle_name
            result.middle_name = last_name
        else:
            result.first_name = first_name.strip()
            result.middle_name = middle_name.strip()
            result.last_name = last_name.strip()

    elif first_name:
        names = first_name["latin"].split("\n")
        if len(names) == 2:
            first_name, middle_name = names
            result.first_name = first_name.strip()
            result.middle_name = middle_name.strip()
        else:
            result.first_name = first_name.strip()

    if last_name_obj:
        result.last_name = last_name_obj["latin"].strip()
    if date_of_birth_obj:
        date_of_birth = datetime(
            year=int(date_of_birth_obj["year"]),
            month=int(date_of_birth_obj["month"]),
            day=int(date_of_birth_obj["day"]),
        )
        result.date_of_birth = date_of_birth

    if face_image_base64_string:
        image_data = base64.b64decode(face_image_base64_string)
        result.front_image = image_data

    if document_number:
        no_ = document_number.get("latin", None)
        result.document_number = no_.strip() if no_ else no_
    return result


def verify_user_document(
    document_image: BinaryIO,
    filename: str,
    user_id: str,
):
    id_file_path = save_user_document(document_image, filename, user_id)
    verification_id = init_verification(user_id)
    document_info = verify_document(verification_id, id_file_path)
    _check_document_fields(document_info)
    personal_info = db.get_personal_information(user_id)
    if not personal_info:
        raise Exception("Personal Info Doesn't exist")
    _verify_document_data(document_info, personal_info)
    assert document_info.front_image

    save_front_image(BytesIO(document_info.front_image), user_id)
    new_info = {
        "credentials_verified": True,
        "document_id": document_info.document_number,
    }
    db.update_verification_info(verification_id, new_info)
    return True


def save_user_document(
    document_image: BinaryIO,
    filename: str,
    user_id: str,
):
    ext = filename.split(".")[-1] if filename else " "
    user_upload_dir = f"{upload_dir}/{user_id}"
    os.makedirs(user_upload_dir, exist_ok=True)
    files = os.listdir(user_upload_dir)
    for file in files:
        if file.startswith("id"):
            os.remove(f"{user_upload_dir}/{file}")

    file_path = os.path.join(user_upload_dir, f"id.{ext}".strip())

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(document_image, buffer)
    return file_path


def save_front_image(
    image: BytesIO,
    user_id: str,
):
    user_upload_dir = f"{upload_dir}/{user_id}"
    os.makedirs(user_upload_dir, exist_ok=True)
    files = os.listdir(user_upload_dir)
    for file in files:
        if file.startswith("face"):
            os.remove(f"{user_upload_dir}/{file}")
    img = Image.open(image)
    _format = img.format
    img_format = _format.lower() if _format else ".jpg"
    path = f"{upload_dir}/{user_id}/face.{img_format}"
    img.save(path)


def get_user_id_front_image_path(
    user_id: str,
) -> str | None:
    user_uploads_dir = f"{upload_dir}/{user_id}"
    files = os.listdir(user_uploads_dir)
    for file in files:
        if file.startswith("face"):
            return f"{user_uploads_dir}/{file}"
    return None


def _check_document_fields(
    data: IdDocumentInfo,
):
    if not data.first_name:
        raise Exception("Unable to extract first name")
    elif not data.last_name:
        raise Exception("Unable to extract last name")
    elif not data.last_name:
        raise Exception("Unable to extract last name")
    # elif not data.date_of_birth:
    #     raise Exception("Unable to extract date of birth")
    elif not data.front_image:
        raise Exception("Unable to extract front image")
    elif not data.document_number:
        raise Exception("Unable to extract document id number")


def _verify_document_data(
    document_info: IdDocumentInfo,
    personal_info: PersonalInformation,
):
    assert document_info.first_name
    assert document_info.last_name
    assert document_info.middle_name
    assert document_info.document_number

    year, month, day = personal_info.date_of_birth.split("-")
    date_of_birth = datetime(year=int(year), month=int(month), day=int(day))
    usr_doc = db.get_user_by_id_number(document_info.document_number)

    if document_info.first_name.lower() != personal_info.first_name.lower():
        raise Exception("User first name doesn't match id first name")
    elif document_info.last_name.lower() != personal_info.last_name.lower():
        raise Exception("User last name doesn't match id last name")
    elif document_info.middle_name.lower() != personal_info.middle_name.lower():
        raise Exception("User middle name doesn't match id middle name")
    elif document_info.date_of_birth and document_info.date_of_birth != date_of_birth:
        raise Exception("User date of birth doesn't match id date of birth")
    elif usr_doc and usr_doc.kyc_verified:
        raise Exception("Document already in use")


def verify_user_face(
    user_face_image: BinaryIO,
    user_id: str,
    user_email: str,
):
    verification = db.get_user_verification(user_id)
    if not verification:
        raise Exception("Verification not started")
    elif not verification.credentials_verified:
        raise Exception("Verification Credentials not verified")

    id_face = get_user_id_front_image_path(user_id)

    if not id_face:
        raise Exception("If front image not found")

    with open(id_face, "rb") as id_face_obj:
        score = compare_faces(verification.id, user_face_image, id_face_obj)

    if score < face_comparison_threshold:
        raise Exception("Face mismatch")

    complete_verification(verification.id)
    db.update_user(user_email, {"kyc_verified": True})


def save_user_face(image: BinaryIO, user_id):
    user_upload_dir = f"{upload_dir}/{user_id}"
    os.makedirs(user_upload_dir, exist_ok=True)
    files = os.listdir(user_upload_dir)
    for file in files:
        if file.startswith("user_face"):
            os.remove(f"{user_upload_dir}/{file}")

    img = Image.open(image)
    _format = img.format
    img_format = _format.lower() if _format else ".jpg"
    path = f"{upload_dir}/{user_id}/user_face.{img_format}"
    img.save(path)
    return path


