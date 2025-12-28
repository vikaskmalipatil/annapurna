import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const snapshot = await getDocs(collection(db, "transactions"));

        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTransactions(data);
      } catch (err) {
        console.error("Error fetching transactions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="container">
      <h2>User Transaction History</h2>

      {loading && <p>Loading transactions...</p>}

      {!loading && transactions.length === 0 && (
        <p>No transactions found.</p>
      )}

      {transactions.map(tx => (
        <div className="card" key={tx.id}>
          <p><strong>Item:</strong> {tx.item || "N/A"}</p>
          <p><strong>Quota:</strong> {tx.quotaKg} kg</p>
          <p><strong>Weighed:</strong> {tx.weighedKg} kg</p>
          <p><strong>Status:</strong> {tx.aiApproved ? "Approved" : "Rejected"}</p>
        </div>
      ))}
    </div>
  );
}
