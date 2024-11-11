"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import "../../css/button.css"; // Import the CSS file
import { isMobile } from "react-device-detect";

interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  text: string;
}

export default function Button({ onClick, text }: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const audioContextRef = useRef<AudioContext | null>(null);

  const createSoftSound = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).webkitAudioContext)();
    }

    const context = audioContextRef.current;
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(150, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      120,
      context.currentTime + 0.1
    );

    gainNode.gain.setValueAtTime(0.05, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start();
    oscillator.stop(context.currentTime + 0.1);
  }, []);

  const handlePress = (pressed: boolean) => {
    setIsPressed(pressed);
    if (pressed) {
      createSoftSound();
    }
  };

  useEffect(() => {
    if (isPressed) {
      setTimeout(() => {
        setIsPressed(false);
      }, 100);
    }
  }, [isPressed]);

  return (
    <div>
      <motion.button
        ref={btnRef}
        onMouseDown={() => (!isMobile ? handlePress(true) : null)}
        onMouseUp={() => (!isMobile ? handlePress(false) : null)}
        onMouseLeave={() => (!isMobile ? handlePress(false) : null)}
        onTap={() => (isMobile ? handlePress(true) : null)}
        onTapCancel={() => (isMobile ? handlePress(false) : null)}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 0.9 }}
        onClick={onClick}
        className={`btn ${isPressed ? "pressed" : ""}`}
      >
        {text}
        <span className='highlight' />
      </motion.button>
    </div>
  );
}
