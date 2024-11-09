"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import "../../css/button.css"; // Import the CSS file
import { isMobile } from "react-device-detect";

interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  text: string;
}

export default function Button({ onClick, text }: ButtonProps) {
  const [audio, setAudio] = useState<AudioContext | null>(null);
  const [isPressed, setIsPressed] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setAudio(new (window.AudioContext || (window as any).webkitAudioContext)());
  }, []);

  const playSound = useCallback(() => {
    if (audio) {
      const oscillator = audio.createOscillator();
      const gainNode = audio.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audio.destination);

      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(100, audio.currentTime);
      gainNode.gain.setValueAtTime(0.8, audio.currentTime);

      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audio.currentTime + 0.05
      );

      oscillator.start();
      oscillator.stop(audio.currentTime + 0.05);
    }
  }, [audio]);

  const handlePress = (pressed: boolean) => {
    if (pressed) playSound();
    setIsPressed(pressed);
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
        className={`btn  ${isPressed ? "pressed" : ""}`}
      >
        {text}
        <span className='highlight' />
      </motion.button>
    </div>
  );
}
