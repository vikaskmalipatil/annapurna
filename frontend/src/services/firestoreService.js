import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, serverTimestamp, query, where, orderBy, getDocs } from 'firebase/firestore';

// Function to log transaction to Firestore
export const logTransaction = async (transactionData) => {
  try {
    const transactionRef = collection(db, 'transactions');
    
    const docData = {
      userId: transactionData.userId,
      item: transactionData.item || 'rice',
      quotaKg: transactionData.quotaKg,
      weighedKg: transactionData.weighedKg,
      aiApproved: transactionData.aiApproved,
      reason: transactionData.reason,
      timestamp: serverTimestamp(),
      imageUrl: transactionData.imageUrl // Optional: store proof image
    };
    
    const docRef = await addDoc(transactionRef, docData);
    console.log('✅ Transaction logged with ID:', docRef.id);
    
    return docRef.id;
    
  } catch (error) {
    console.error('❌ Failed to log transaction:', error);
    throw error;
  }
};

// Function to get user's transaction history (useful for Member 4)
export const getUserTransactions = async (userId) => {
  try {
    const q = query(
      collection(db, 'transactions'), 
      where('userId', '==', userId),
      orderBy('timestamp', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const transactions = [];
    
    querySnapshot.forEach((doc) => {
      transactions.push({ id: doc.id, ...doc.data() });
    });
    
    return transactions;
    
  } catch (error) {
    console.error('Failed to fetch transactions:', error);
    throw error;
  }
};