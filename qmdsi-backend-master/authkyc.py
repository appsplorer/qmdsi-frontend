
import google.generativeai as genai
from PIL import Image
import json
import pytesseract
import os
import cv2
import numpy as np


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


def extractor(image_link):
    try:
         img_path = image_link
         script_directory = os.path.dirname(os.path.abspath(__file__))
         path_file = os.path.join(script_directory, "scanned_img")
         if not os.path.exists(path_file):
             os.makedirs(path_file)
         images = os.path.basename(image_link)
         full_path = os.path.join(path_file, images)
         img = cv2.imread(img_path)
         cv2.imwrite(full_path, img)
         #img = brigth_some_pixel(img,brightness_value=100)
         img = dim_some_pixel(img, threshold=170)
         img = cv2.bitwise_not(img)
         #cv2.imwrite('image.jpg',img)
         #  pytesseract.pytesseract.tesseract_cmd = '/usr/bin/tesseract'
         extracted_text = pytesseract.image_to_string(img,lang="eng",timeout=20)
         print(extracted_text)
         #API_KEY = os.getenv('GOOGLE_API_KEY')
         API_KEY = 'AIzaSyCDv5adaf0eYx5aUBnqnJ4HyJ1OFE5kDts'
         
         genai.configure(api_key=API_KEY)
         
         model = genai.GenerativeModel('gemini-pro')
         chat = model.start_chat()
    
         response = chat.send_message(f"""You are a helpful assistant designed to output JSON,but don't include json word inside the output,give only the result data in json format.
                 Given user input, match main keywords/terms with their corresponding key names if they appear in the text if they did not match there value as None. The keywords include:
                 Id,First_name,Middle_name,Suname,Nationality,Date_Of_Birth,Date_Of_Issues,Issues_Authority,Expiry_Date,Gender, Card_Type.
                 store Date_Of_Birth,Date_Of_Issues,Expiry_Date in normal data format e.g "YYYY-MM-DD".
                 Gender can only be string not integer e.g F/M{extracted_text}""")
         return response.text
     
    except Exception as err:
        print(err)
        return None
    
    


def get_id_no_and_fullname_from_id_card(id_card_image):
    data = extractor(id_card_image)
    print(id_card_image)
    print(data)
    if not data or not isinstance(data, str):
        return None, None, None
    try:
        data = json.loads(data)
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return None, None, None
    fullname = None
    id = None
    dob = None
    first_name = data.get('First_name')
    middle_name = data.get('Middle_name')
    surname = data.get('Suname')

    if first_name or middle_name or surname:
        fullname = " ".join(filter(None, [first_name or '', middle_name or '', surname or '']))

    id = str(data.get('Id')).replace(" ","")
    dob = data.get('Date_Of_Birth')
    print(dob)

    if id is None or id == "":
        id = None 

    if dob is None or dob == "":
        dob = None 

    return fullname, id, dob




    
def dim_some_pixel(image=any, threshold= 100, dim_value= 50):
    #image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    threshold_value = threshold
    mask = image > threshold_value
    
    # Increase the brightness of pixels with value less than threshold
    brightness_offset = dim_value 
    image[mask] = np.clip(image[mask] - brightness_offset, 0, 255)
    return image


def name_contains(full_name: str, name_to_check: str) -> bool:
    full_name_tokens = set(full_name.lower().split())
    name_to_check_tokens = set(name_to_check.lower().split())
    return name_to_check_tokens.issubset(full_name_tokens)