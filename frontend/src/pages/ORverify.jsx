import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Link, useNavigate } from "react-router-dom"; // 🔹 ADDED useNavigate

export default function QRverify() {
  const hasScanned = useRef(false);
  const [verifiedData, setVerifiedData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // 🔹 ADDED

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 280 },
      false
    );

    scanner.render(
      async (decodedText) => {
        if (hasScanned.current) return;
        hasScanned.current = true;
        setLoading(true);

        try {
          await scanner.clear();
          const rationNumber = decodedText.trim();

          // USER QUERY
          const userQuery = query(
            collection(db, "users"),
            where("rationCardNumber", "==", rationNumber)
          );
          const userSnap = await getDocs(userQuery);

          if (userSnap.empty) {
            setError("Ration Card not found in our database.");
            setLoading(false);
            return;
          }

          const user = userSnap.docs[0].data();

          // QUOTA QUERY
          const quotaQuery = query(
            collection(db, "quotas"),
            where("rationCardNumber", "==", rationNumber)
          );
          const quotaSnap = await getDocs(quotaQuery);

          if (quotaSnap.empty) {
            setError("Allocation data missing for this card.");
            setLoading(false);
            return;
          }

          const quota = quotaSnap.docs[0].data();

          setVerifiedData({
            name: user.name,
            phone: user.phone || user.pone,
            rationCardNumber: rationNumber,
            grainKg: quota.allocatedGrainKg,
            oilKg: quota.allocatedOilKg
          });
        } catch (err) {
          setError("Failed to process QR. Please try again.");
        } finally {
          setLoading(false);
        }
      },
      () => {}
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <header className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors mb-6 font-semibold">
            ← Back to Dashboard
          </Link>

          <h2 className="text-4xl font-black text-slate-900">
            QR <span className="text-emerald-600">Verification</span>
          </h2>
          <p className="text-slate-500 font-medium">
            Authenticate user eligibility via secure QR scan.
          </p>
        </header>

        {/* Scanner */}
        {!verifiedData && !error && (
          <div className="bg-white rounded-3xl shadow-sm border p-8 text-center">
            <div id="reader" className="w-full max-w-sm mx-auto border-4 border-emerald-500 rounded-xl"></div>
            <p className="mt-6 font-semibold text-slate-500">Waiting for QR code...</p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-3xl p-20 text-center shadow-sm">
            <div className="animate-spin w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="font-bold">Fetching records...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-white rounded-3xl p-10 text-center border border-red-200">
            <h3 className="text-xl font-bold text-red-600 mb-4">Verification Failed</h3>
            <p className="mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-black text-white rounded-xl"
            >
              Try Again
            </button>
          </div>
        )}

        {/* VERIFIED RESULT */}
        {verifiedData && (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

            <div className="bg-emerald-600 text-white text-center p-6">
              <h3 className="text-2xl font-black">IDENTITY VERIFIED</h3>
              <p className="text-emerald-100">Member details retrieved</p>
            </div>

            <div className="p-8 grid md:grid-cols-2 gap-6">
              <div>
                <p><strong>Name:</strong> {verifiedData.name}</p>
                <p><strong>Phone:</strong> {verifiedData.phone}</p>
                <p><strong>Card:</strong> {verifiedData.rationCardNumber}</p>
              </div>

              <div>
                <p><strong>Grains:</strong> {verifiedData.grainKg} kg</p>
                <p><strong>Oil:</strong> {verifiedData.oilKg} kg</p>
              </div>
            </div>

            <div className="p-6 flex flex-col gap-4">
              <button
                onClick={() => window.location.reload()}
                className="w-full py-3 border rounded-xl font-bold"
              >
                New Scan
              </button>

              {/* 🔹 ONLY NEW BUTTON ADDED */}
              <button
                onClick={() =>
                  navigate(`/ai-scale/${verifiedData.rationCardNumber}`)
                }
                className="w-full py-4 bg-emerald-600 text-white rounded-xl font-black text-lg hover:bg-emerald-700 transition-all"
              >
                ⚖️ Proceed to AI Weighing
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
