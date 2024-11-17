"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "../../css/button.css"; // Import the CSS file
import { isMobile } from "react-device-detect";
import { GameState } from "../../hooks/GameState";

interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  text: string;
  addedClassName: string;
  disabled: boolean;
}

export default function Button({
  onClick,
  text,
  addedClassName,
  disabled,
}: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const btnRef = useRef<HTMLDivElement>(null);

  const [clickSound] = useState(new Audio("/sounds/Click.mp3"));

  const sounds = GameState((state) => state.sounds);

  const handlePress = (pressed: boolean) => {
    setIsPressed(pressed);
    if (pressed && sounds) {
      clickSound.play();
    }
  };

  useEffect(() => {
    if (isPressed) {
      setTimeout(() => {
        setIsPressed(false);
      }, 50);
    }
  }, [isPressed]);

  return (
    <motion.div
      onMouseDown={() => (!isMobile ? handlePress(true) : null)}
      onMouseUp={() => (!isMobile ? handlePress(false) : null)}
      onMouseLeave={() => (!isMobile ? handlePress(false) : null)}
      onTap={() => (isMobile ? handlePress(true) : null)}
      onTapCancel={() => (isMobile ? handlePress(false) : null)}
      onClick={onClick}
      ref={btnRef}
    >
      <motion.button
        disabled={disabled}
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: isPressed ? 0.1 : 1 }}
        className={`btn ${addedClassName} ${isPressed ? "pressed" : ""}`}
      >
        {text}
        <span className='highlight' />
      </motion.button>
    </motion.div>
  );
}
