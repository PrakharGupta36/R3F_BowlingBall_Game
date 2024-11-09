import { useEffect, useRef } from "react";
import { GameState } from "../hooks/GameState";
import Button from "./ui/Button";
import { motion, useAnimationControls } from "framer-motion";

type StrengthSliderProps = {
  dialRef: React.RefObject<HTMLDivElement>;
  value: number;
};

function StrengthSlider({ dialRef, value }: StrengthSliderProps) {
  const booleans = GameState((state) => state.booleans);

  const { isStrength } = booleans;

  const controls = useAnimationControls();

  useEffect(() => {
    if (isStrength) {
      controls.stop();
    } else {
      controls.start({
        top: "96%",
        transition: {
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
          type: "bounce",
          bounce: 0.05,
        },
      });
    }
  }, [isStrength, controls]);

  return (
    <div className='strength'>
      <motion.div
        className='strength_bar'
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <motion.div
          ref={dialRef}
          className='strength_bar_dial'
          initial={{ top: isStrength ? value : "1%" }}
          animate={controls}
        ></motion.div>
      </motion.div>
    </div>
  );
}

export default function GUI() {
  const setClicked = GameState((state) => state.setClicked);
  const booleans = GameState((state) => state.booleans);
  const setBoolean = GameState((state) => state.setBooleans);

  const { isStrength, isDirection, isThrow } = booleans;

  const dialRef = useRef<HTMLDivElement>(null);

  const dialValue = () => {
    const value = parseInt(dialRef.current?.style.top?.slice(0, 2) as string);

    return value;
  };

  const handleButtonClick = () => {
    if (!isStrength && !isDirection && !isThrow) {
      console.log("Selecting Strength");
      setBoolean("isStrength", true);
      // dialValue();
      console.log(dialValue());
    } else if (!isDirection && !isThrow) {
      console.log("Selecting Direction");
    } else if (!isThrow) {
      setClicked(); // Trigger the 'Throw Ball' action
      setBoolean("isThrow", true);
    }
  };

  const getButtonLabel = () => {
    if (!isStrength && !isDirection && !isThrow) {
      return "Select Strength";
    }
    if (!isDirection && !isThrow) {
      return "Select Direction";
    }
    if (!isThrow) {
      return "Throw Ball";
    }
    return "";
  };

  return (
    <>
      <StrengthSlider dialRef={dialRef} value={dialValue()} />
      <Button onClick={handleButtonClick} text={getButtonLabel()} />
    </>
  );
}
