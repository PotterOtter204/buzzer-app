'use client';
import React from 'react';

export default function ResultCard({ index, name, time }) {
  return (
    <div className="bg-black bg-opacity-30 p-3 rounded-md flex justify-between items-center text-white border border-white border-opacity-20">
      <span className="font-semibold">{index + 1}. {name}</span>
      <span className="text-sm">{new Date(time.seconds * 1000).toLocaleTimeString()}</span>
    </div>
  );
}
