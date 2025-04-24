'use client';
import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import useSound from 'use-sound';

export default function ConfettiPop({ trigger }) {
  // Play from public folder by passing the path as a string
  const [play] = useSound('/pop.mp3', { volume: 0.5 });

  useEffect(() => {
    if (trigger) {
      // Left side confetti
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { x: 0, y: 0.5 },
      });

      // Right side confetti
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { x: 1, y: 0.5 },
      });

      play(); // Play the sound
    }
  }, [trigger]);

  return null;
}
