import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import {
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function QRverify() {
  const hasScanned = useRef(false);

  const [verifiedData, setVerifiedData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(
      async (decodedText) => {
        if (hasScanned.current) return;
        hasScanned.current = true;

        try {
          await scanner.clear();

          const rationNumber = decodedText.trim();
          console.log("SCANNED QR:", rationNumber);

          // 1️⃣ USER QUERY (TYPO FIELD USED)
          const userQuery = query(
            collection(db, "users"),
            where("rationCardNumber", "==", rationNumber)
          );

          const userSnap = await getDocs(userQuery);

          if (userSnap.empty) {
            setError("User not found");
            return;
          }

          const user = userSnap.docs[0].data();

          // 2️⃣ QUOTA QUERY
          const quotaQuery = query(
            collection(db, "quotas"),
            where("rationCardNumber", "==", rationNumber)
          );

          const quotaSnap = await getDocs(quotaQuery);

          if (quotaSnap.empty) {
            setError("Quota not found");
            return;
          }

          const quota = quotaSnap.docs[0].data();

          // ✅ VERIFIED DATA
          setVerifiedData({
            name: user.name,
            phone: user.pone,
            rationCardNumber: rationNumber,
            grainKg: quota.allocatedGrainKg,
            oilKg: quota.allocatedOilKg
          });

        } catch (err) {
          console.error(err);
          setError("Something went wrong");
        }
      },
      () => {}
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
    <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">

      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-12 text-center">
        <div className="text-8xl mb-4">🎫</div>
        <h2 className="text-5xl font-bold text-white mb-3">
          Ration Card Verification
        </h2>
        <p className="text-blue-100 text-lg">Scan QR code to verify eligibility</p>
      </div>

      <div className="p-12">
        {/* Scanner */}
        {!verifiedData && (
          <>
            <div className="relative">
              <div
                id="reader"
                className="w-full bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border-4 border-dashed border-purple-300 shadow-inner"
              ></div>

              <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-6 py-3 rounded-full text-base font-bold shadow-lg animate-pulse">
                Ready to Scan
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-purple-200">
              <p className="text-center text-gray-700 text-lg font-medium flex items-center justify-center gap-3">
                <span className="text-4xl">📷</span>
                Align the QR code inside the camera view
              </p>
            </div>
          </>
        )}

        {/* Error */}
        {error && (
          <div className="mt-8 bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-6 rounded-2xl text-center font-bold shadow-lg transform hover:scale-105 transition-transform">
            <div className="text-5xl mb-3">❌</div>
            <div className="text-2xl">{error}</div>
          </div>
        )}

        {/* Verified Data */}
        {verifiedData && (
          <div className="mt-6 space-y-6">
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-6 text-center shadow-xl transform hover:scale-105 transition-transform">
              <div className="text-5xl mb-3">✅</div>
              <h3 className="text-2xl font-bold text-white mb-1">Verification Successful!</h3>
              <p className="text-green-50 text-sm">Ration card details retrieved</p>
            </div>

            {/* User Info Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl">
                  👤
                </div>
                <h4 className="text-xl font-bold text-gray-800">Personal Details</h4>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center bg-white p-3 rounded-xl">
                  <span className="font-semibold text-gray-600">Name</span>
                  <span className="text-gray-900 font-medium">{verifiedData.name}</span>
                </div>

                <div className="flex justify-between items-center bg-white p-3 rounded-xl">
                  <span className="font-semibold text-gray-600">Phone</span>
                  <span className="text-gray-900 font-medium">{verifiedData.phone}</span>
                </div>

                <div className="flex justify-between items-center bg-white p-3 rounded-xl">
                  <span className="font-semibold text-gray-600">Ration Card</span>
                  <span className="text-blue-600 font-bold">{verifiedData.rationCardNumber}</span>
                </div>
              </div>
            </div>

            {/* Quota Card */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-200 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl">
                  📦
                </div>
                <h4 className="text-xl font-bold text-gray-800">Allocated Quota</h4>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl text-center border-2 border-green-300 shadow-md">
                  <div className="text-3xl mb-2">🌾</div>
                  <div className="text-gray-600 text-sm font-medium mb-1">Grain</div>
                  <div className="text-2xl font-bold text-green-600">{verifiedData.grainKg} <span className="text-lg">Kg</span></div>
                </div>

                <div className="bg-white p-4 rounded-xl text-center border-2 border-yellow-300 shadow-md">
                  <div className="text-3xl mb-2">🛢️</div>
                  <div className="text-gray-600 text-sm font-medium mb-1">Oil</div>
                  <div className="text-2xl font-bold text-yellow-600">{verifiedData.oilKg} <span className="text-lg">Kg</span></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);}