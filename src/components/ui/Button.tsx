"use client";

import { useState, useEffect, useCallback } from "react";

interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  text: string;
}

export default function Button({ onClick, text }: ButtonProps) {
  const [audio, setAudio] = useState<AudioContext | null>(null);
  const [isPressed, setIsPressed] = useState(false);

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
      gainNode.gain.setValueAtTime(1, audio.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audio.currentTime + 0.05
      );

      oscillator.start();
      oscillator.stop(audio.currentTime + 0.05);
    }
  }, [audio]);

  const handleMouseDown = () => {
    playSound();
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  return (
    <div>
      <button
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={onClick}
        className='btn main_button'
        style={{
          width: "100%",
          whiteSpace: "nowrap",
          fontSize: "10px",
          fontFamily: '"Press Start 2P", cursive',
          color: "#fff",
          backgroundColor: isPressed ? "#2ecc71" : "#e74c3c",
          border: "none",
          borderRadius: "50px",
          boxShadow: isPressed
            ? "inset 0 0 10px rgba(0,0,0,0.5)"
            : "0 0 20px #e74c3c, 0 0 60px #e74c3c, 0 0 100px #e74c3c",
          cursor: "pointer",
          outline: "none",
          transition: "all 0.05s ease",
          transform: isPressed ? "translateY(4px)" : "translateY(0)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {text}
        <span
          style={{
            position: "absolute",
            background: "rgba(255, 255, 255, 0.2)",
            width: "100%",
            height: "100%",
            left: "-100%",
            top: "0",
            transform: "skewX(-20deg)",
            transition: "all 0.3s ease",
          }}
        />
      </button>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

        btn:hover {
          background-color: ${isPressed ? "#27ae60" : "#c0392b"};
        }

        btn:hover span {
          left: 100%;
        }
      `}</style>
    </div>
  );
}
