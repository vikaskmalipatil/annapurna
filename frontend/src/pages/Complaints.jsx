import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function Complaints() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const submitComplaint = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      setStatus("Please enter a complaint.");
      return;
    }

    try {
      await addDoc(collection(db, "complaints"), {
        userId: "demo-user",
        message,
        timestamp: serverTimestamp(),
        status: "open",
      });

      setMessage("");
      setStatus("Complaint submitted successfully ✅");
    } catch (err) {
      console.error(err);
      setStatus("Error submitting complaint ❌");
    }
  };

  return (
    <div className="container">
      <h2>Complaint Portal</h2>

      <div className="card">
        <form onSubmit={submitComplaint}>
          <textarea
            rows="4"
            placeholder="Describe your issue..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <br /><br />
          <button type="submit">Submit Complaint</button>
        </form>

        {status && <p>{status}</p>}
      </div>
    </div>
  );
}
