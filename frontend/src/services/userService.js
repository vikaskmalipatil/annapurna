import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export const getUserQuota = async (rationCardNumber) => {
  try {
    console.log('=== DEBUG START ===');
    console.log('Looking for:', rationCardNumber);
    console.log('Type:', typeof rationCardNumber);
    
    // Get ALL documents without filtering
    const quotasRef = collection(db, 'quotas');
    const allDocs = await getDocs(quotasRef);
    
    console.log('Total documents in quotas collection:', allDocs.size);
    
    // Print ALL documents
    let foundDoc = null;
    allDocs.forEach(doc => {
      const data = doc.data();
      console.log('---Document---');
      console.log('ID:', doc.id);
      console.log('Full data:', data);
      console.log('rationCardNumber field:', data.rationCardNumber);
      console.log('Match?', data.rationCardNumber === rationCardNumber);
      
      if (data.rationCardNumber === rationCardNumber) {
        foundDoc = { id: doc.id, data: data };
      }
    });
    
    console.log('=== DEBUG END ===');
    
    if (!foundDoc) {
      throw new Error(`No quota found for ration card: ${rationCardNumber}`);
    }
    
    return {
      rationCardNumber: foundDoc.data.rationCardNumber,
      allocatedGrainKg: foundDoc.data.allocatedGrainKg,
      allocatedOilKg: foundDoc.data.allocatedOilKg,
      userId: foundDoc.id
    };
    
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
// ```

// ---

// ## 🔄 Save, Stop Server, Restart

// 1. **Save the file**
// 2. Terminal: Press `Ctrl + C`
// 3. Terminal: Type `npm start`
// 4. **Browser: Press `Ctrl + Shift + R`** (hard refresh)

// ---

// ## 📋 Now Check Console

// You should see a **detailed printout** like:
// ```
// === DEBUG START ===
// Looking for: RC6574
// Type: string
// Total documents in quotas collection: 3
// ---Document---
// ID: abc123
// Full data: {...}
// rationCardNumber field: RC6574
// Match? true
// === DEBUG END ===