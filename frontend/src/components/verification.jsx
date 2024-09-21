import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import api from "../services/api.service";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";


const Verification = () => {
const {address} = useWeb3ModalAccount()
  const { auth } = useContext(AuthContext);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [testState, setTestState] = useState(false);
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const handleCapture = async () => {
    try{
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        // Convert Base64 to Blob
        const byteString = atob(imageSrc.split(',')[1]);
        const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
  
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
  
        const blob = new Blob([ab], { type: mimeString });
  
        // Create FormData and append the Blob
        const screenShot = new FormData();
        screenShot.append("image", blob, "screenshot.png"); // Optionally, give the file a name
        screenShot.append("walletAddress", address)
        console.log(address)
        // Send the form data with axios
        const response = await api.post("/verify", screenShot, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        });
        // axios.post("http://127.0.0.1:8000/verify", screenShot, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data'
        //   }
        // })
        // .then((response) => {
        //     console.log(response.data.status)
          if (response.data.status === "success") {
            setIsVerified(true);
            setStatusMessage("Verification Successful!");
            toast.success("Face verification Successful!");
            setTimeout(() => {
              setIsCapturing(false);
            //   setStatusMessage("");
            }, 1000); 
            navigate("/");

        }
          else if(response.data.status === "notFound"){
            setStatusMessage("Id card image not found. make sure you upload it and try again.");
            toast.error("Id card image not found. make sure you upload it and try again.")
            setIsCapturing(false);
            setTestState(true);
          } else {
            setStatusMessage("Verification Failed. Please try again.");
            toast.error("Verification Failed. Please try again.")
            setIsCapturing(false);
            setTestState(true);
          }
        
      }}}
      catch(error) {
          console.error("Verification failed:", error);
          setStatusMessage("No face detected in the image. Please try again.");
          toast.error("No face detected in the image. Please try again.")
          setIsCapturing(false);
          setTestState(true);
        }
      }

  

  const handleStartCapture = () => {
    setIsCapturing(true);
    setIsVerified(false);
    setStatusMessage("");
    setTestState(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {isCapturing ? (
        <>
          <div className="relative w-full max-w-md">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full rounded-lg"
              videoConstraints={{
                width: 500,
                height: 600,
                facingMode: "user",
              }}
            />
            <div
              className={`absolute inset-0 flex items-center justify-center rounded-full border-4 ${
                isVerified ? "border-green-500" : "border-red-500"
              }`}
              style={{
                width: '70%',
                height: '70%',
                borderRadius: '50%',
                top: '15%',
                left: '15%',
              }}
            />
          </div>
          {isVerified?           <button
            onClick={handleCapture}
            className="mt-4 bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600"

          >
            Verified
          </button>: 
                    <button
                    onClick={handleCapture}
                    className="mt-4 bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
                  >
                    Capture Image
                  </button>
            }

        </>
      ) : (
        <>
        {
        isVerified ? "" :
    <button
    onClick={handleStartCapture}
    className="bg-yellow-500 text-white py-2 px-6 rounded hover:bg-yellow-600"
    >

            {statusMessage ? "Capture Again" : "Start Verification"}
          </button>
}
          {statusMessage && (
            <p className={`mt-4 text-xl font-semibold ${testState ? "text-red-600" : "text-green-600"}`}>
              {statusMessage}
            </p>
          )}
          
        </>
      )}
    </div>
  );
};

export default Verification;
