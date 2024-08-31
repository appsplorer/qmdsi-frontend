import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react'
const Verification = () => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [testState, setTestState] = useState(false);
  const {address} = useWeb3ModalAccount()
  const webcamRef = useRef(null);
  const handleCapture = () => {
    
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const pictureData = new FormData();
        pictureData.append('image', imageSrc);
        pictureData.append('walletAddress', address);
        // pictureData.append('uploaded_id_card_image',uploadedId )  pass the image from the kyc component to this place
        axios.post("http://127.0.0.1:8000/verify",pictureData,
            {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
       })
        .then((response) => {
          const success = response.data.success; 
          if (success) {
            setIsVerified(true);
            setStatusMessage("Verification Successful!");
            setTimeout(() => {
              setIsCapturing(false);
              setStatusMessage("");
            }, 3000); 
          } else {
            setStatusMessage("Verification Failed. Please try again.");
            setIsCapturing(false);
            setTestState(true);
          }
        })
        .catch((error) => {
          console.error("Verification failed:", error);
          setStatusMessage("Verification Failed. Please try again.");
          setIsCapturing(false);
          setTestState(true);
        });
      }
    }
  };

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
                width: 800,
                height: 600,
                facingMode: "user",
              }}
            />
            <div
              className={`absolute inset-0 flex items-center justify-center rounded-full border-4 ${
                isVerified ? "border-green-500" : "border-red-500"
              }`}
              style={{
                width: '60%',
                height: '70%',
                borderRadius: '50%',
                top: '15%',
                left: '15%',
              }}
            />
          </div>
          <button
            onClick={handleCapture}
            className="mt-4 bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
          >
            Capture Image
          </button>
        </>
      ) : (
        <>
    <button
    onClick={handleStartCapture}
    className="bg-[#FFD700] text-white py-2 px-6 rounded hover:bg-[#FFC107]"
    >
            {statusMessage ? "Capture Again" : "Start Verification"}
          </button>
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
