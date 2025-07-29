'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';

export default function FirebaseTest() {
  const [status, setStatus] = useState('Testing...');

  useEffect(() => {
    if (auth && db) {
      setStatus('✅ Firebase connected successfully!');
    } else {
      setStatus('❌ Firebase connection failed');
    }
  }, []);

  return (
    <div className="p-4 bg-blue-100 rounded-lg">
      <h2 className="text-lg font-bold mb-2">Firebase Status</h2>
      <p>{status}</p>
    </div>
  );
}