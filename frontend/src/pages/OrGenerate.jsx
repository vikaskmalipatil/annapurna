import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QrGenerate() {
  const [rationCardNumber, setRationCardNumber] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4 text-center">
          Generate Ration Card QR
        </h2>

        <input
          className="w-full border p-2 rounded mb-4"
          placeholder="Ration Card Number"
          value={rationCardNumber}
          onChange={(e) => setRationCardNumber(e.target.value)}
        />

        {rationCardNumber && (
          <div className="flex flex-col items-center">
            <QRCodeCanvas value={rationCardNumber} size={200} />
            <p className="mt-2 text-sm text-gray-600">
              Print & paste on ration card
            </p>
          </div>
        )}
      </div>
    </div>
  );
}