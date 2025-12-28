// src/components/verification/FaceCapture.jsx
import { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Camera, RotateCcw, Check, AlertCircle, Loader2, Scan } from 'lucide-react';
import { checkWebcamAvailability } from '../../utils/helpers';

function FaceCapture({ userId, onCaptureComplete }) {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [webcamReady, setWebcamReady] = useState(false);
  const [webcamError, setWebcamError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    const checkWebcam = async () => {
      const available = await checkWebcamAvailability();
      if (!available) setWebcamError(true);
    };
    checkWebcam();
  }, []);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  const handleWebcamReady = () => {
    setWebcamReady(true);
    setWebcamError(false);
  };

  const handleWebcamError = (error) => {
    console.error('Webcam error:', error);
    setWebcamError(true);
    setWebcamReady(false);
  };

  const capturePhoto = () => {
    setCountdown(3);
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(countdownInterval);
          const imageSrc = webcamRef.current.getScreenshot();
          if (imageSrc) setCapturedImage(imageSrc);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setCountdown(null);
  };

  const confirmCapture = () => {
    setIsProcessing(true);
    const verificationData = {
      userId: userId,
      faceCaptured: capturedImage,
      faceValid: null
    };
    onCaptureComplete(verificationData);
  };

  if (webcamError) {
    return (
      <div className="flex flex-col items-center justify-center p-10 glass-effect rounded-2xl border-2 border-red-200 animate-fadeIn">
        <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <AlertCircle className="h-12 w-12 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">Camera Access Required</h3>
        <p className="text-gray-600 text-center mb-6 max-w-md">
          Unable to access your camera. Please grant permissions to continue.
        </p>
        <ul className="text-sm text-gray-700 space-y-2 mb-6 text-left bg-red-50 p-4 rounded-xl">
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            Camera permissions are granted for this website
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            Camera is not being used by another application
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            Browser supports camera access
          </li>
        </ul>
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto animate-fadeIn">
      <div className="glass-effect rounded-2xl shadow-2xl p-8 border border-white/20">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-4 animate-pulse">
            <Scan className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Face Verification
          </h2>
          <p className="text-gray-600 font-medium">
            {!capturedImage 
              ? 'Position your face in the frame and smile 😊'
              : 'Review your photo and confirm to proceed'
            }
          </p>
        </div>

        {/* Camera/Image Display */}
        <div className="relative mb-8">
          <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl">
            {!capturedImage ? (
              <>
                {!webcamReady && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
                    <div className="text-center text-white">
                      <Loader2 className="h-16 w-16 animate-spin mx-auto mb-4" />
                      <p className="text-lg font-semibold">Initializing camera...</p>
                    </div>
                  </div>
                )}
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  onUserMedia={handleWebcamReady}
                  onUserMediaError={handleWebcamError}
                  className="w-full h-full object-cover"
                  mirrored={true}
                />
                {/* Face Guide Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative">
                    <div className="w-64 h-80 border-4 border-white/50 rounded-[100px] shadow-lg"></div>
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-3xl"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-3xl"></div>
                  </div>
                </div>
                {/* Countdown */}
                {countdown && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
                    <div className="text-9xl font-bold text-white animate-pulse">
                      {countdown}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <img
                src={capturedImage}
                alt="Captured face"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Status Badge */}
          {webcamReady && !capturedImage && !countdown && (
            <div className="absolute top-6 left-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg animate-pulse">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              Camera Ready
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mb-6">
          {!capturedImage ? (
            <button
              onClick={capturePhoto}
              disabled={!webcamReady || countdown !== null}
              className="flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <Camera className="h-6 w-6" />
              Capture Photo
            </button>
          ) : (
            <>
              <button
                onClick={retakePhoto}
                disabled={isProcessing}
                className="flex items-center gap-2 px-8 py-4 bg-gray-200 text-gray-800 rounded-xl font-bold hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <RotateCcw className="h-5 w-5" />
                Retake
              </button>
              <button
                onClick={confirmCapture}
                disabled={isProcessing}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Check className="h-5 w-5" />
                    Confirm
                  </>
                )}
              </button>
            </>
          )}
        </div>

        {/* Tips */}
        <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
          <h4 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Tips for best results
          </h4>
          <ul className="text-sm text-indigo-800 space-y-2">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              Ensure good lighting on your face
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              Look directly at the camera
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              Remove sunglasses or face coverings
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              Keep your face centered in the frame
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FaceCapture;