'use client'
import React, { useState } from 'react';
import { collection, addDoc, Timestamp } from "firebase/firestore"; 
import { db } from "./firebase-config";
import Image from 'next/image';
import ConfettiPop from './components/ConfettiPop';

export default function Page1() {
  const [name, setName] = useState("");
  const [triggerConfetti, setTriggerConfetti] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const currentTime = Timestamp.now();

    try {
      await addDoc(collection(db, 'Buzzers'), {
        name: name.trim(),
        time: currentTime
      });
      setTriggerConfetti(true);
      setTimeout(() => setTriggerConfetti(false), 300); // Reset trigger
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex flex-col justify-center items-center text-white font-sans px-4">
      <ConfettiPop trigger={triggerConfetti} />
      <h1 className="text-5xl font-black mb-10 text-center text-purple-900"> Buzz In Fast! </h1>
      
      <div className="shadow-2xl rounded-3xl bg-white bg-opacity-10 p-10 backdrop-blur-md flex flex-col items-center space-y-6 border-2 border-white border-opacity-30">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-4 w-72 rounded-xl text-black text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-white shadow-inner"
        />

        <button onClick={handleSubmit} className="focus:outline-none transform hover:scale-105 active:scale-95 transition-transform duration-300">
          <Image
            src="/buzzer.png" 
            alt="Buzzer Button"
            width={400}
            height={400}
            
          />
        </button>
        <p className="text-sm text-white italic">Click the buzzer to lock in your time!</p>
      </div>
    </div>
  );
}
