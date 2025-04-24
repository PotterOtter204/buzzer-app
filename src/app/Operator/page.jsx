'use client'
import React, { useState, useEffect } from 'react';
import ResultCard from '../components/ResultCard';
import { collection, onSnapshot, query, orderBy, deleteDoc, doc, getDocs } from "firebase/firestore"; 
import { db } from "../firebase-config";

export default function Page2() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, "Buzzers");
    const q = query(collectionRef, orderBy("time")); // Order by time (earliest first)

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const buzzers = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data()
      }));
      setData(buzzers);
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  const handleDeleteAll = async () => {
    const querySnapshot = await getDocs(collection(db, "Buzzers"));
    const deletePromises = querySnapshot.docs.map((docSnap) =>
      deleteDoc(doc(db, "Buzzers", docSnap.id))
    );
    await Promise.all(deletePromises);
    setData([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-800 to-black text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 mt-4">⏱️ Buzzer Results</h1>

      <div className="w-full max-w-md bg-white bg-opacity-10 rounded-xl shadow-xl p-6 backdrop-blur-md space-y-4">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={item.id}
              className="bg-black bg-opacity-30 p-3 rounded-md flex justify-between items-center text-white border border-white border-opacity-20"
            >
              <span className="font-semibold">{index + 1}. {item.name}</span>
              <span className="text-sm">{new Date(item.time.seconds * 1000).toLocaleTimeString()}</span>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-300">No results yet.</div>
        )}
      </div>

      <button
        onClick={handleDeleteAll}
        className="mt-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md transition"
      >
        Delete All Buzzers
      </button>
    </div>
  );
}
