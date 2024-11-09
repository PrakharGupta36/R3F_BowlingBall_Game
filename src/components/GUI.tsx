import { useEffect, useRef, useState } from "react";
import { GameState } from "../hooks/GameState";
import Button from "./ui/Button";
import { motion, useAnimationControls } from "framer-motion";
import "../css/gui.css";
import {
  submitValueDirection,
  submitValueStrength,
} from "../utils/helperFunctions";

type StrengthSliderProps = {
  dialRef: React.RefObject<HTMLDivElement>;
  value: number;
};

type DirectionInputProps = {
  arrowRef: React.RefObject<HTMLDivElement>;
  value: number;
};

function StrengthSlider({ dialRef, value }: StrengthSliderProps) {
  const booleans = GameState((state) => state.booleans);
  const setStrength = GameState((state) => state.setStrength);

  const { isStrength } = booleans;

  const controls = useAnimationControls();

  const [valueText, setValueText] = useState<string>("");

  useEffect(() => {
    if (isStrength) {
      controls.stop();
      setValueText(`${value}`);
      submitValueStrength(value, setStrength);
    } else {
      controls.start({
        top: "96%",
        transition: {
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          type: "tween",
          bounce: 0.05,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStrength, controls, value]);

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
          initial={{ top: "1%" }}
          animate={controls}
        >
          <span
            className='strength_bar_dial_text'
            style={{
              backgroundColor: valueText.length ? "black" : "transparent",
            }}
          >
            {valueText}
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}

function DirectionInput({ arrowRef, value }: DirectionInputProps) {
  const controls = useAnimationControls();

  const [directionValueText, setDirectionValueText] = useState<string>();

  const booleans = GameState((state) => state.booleans);

  const { isStrength, isDirection } = booleans;

  const setDirection = GameState((state) => state.setDirection);

  useEffect(() => {
    if (isStrength) {
      controls.start({
        rotate: "30deg",
        transition: {
          duration: 0.4,
          repeat: Infinity,
          repeatType: "reverse",
          type: "tween",
          bounce: 0.05,
        },
      });
      setDirectionValueText(`${value}`);
      if (isDirection) {
        controls.stop();
        submitValueDirection(value, setDirection);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, isDirection, isStrength, controls]);

  return (
    <div className='direction_input'>
      <div className='direction_input_arc'>
        <motion.div
          ref={arrowRef}
          // initial={{ rotate: `(${isStrength ? "-30deg" : "0deg"}` }}
          initial={{ rotate: `-30deg` }}
          animate={controls}
          className='arrow-container'
        >
          {/* Solid part of arrow */}
          <div className='arrow-solid' />

          {/* Dotted line */}
          <div className='arrow-dotted' />
        </motion.div>
        {isDirection ? (
          <div className='arrow-text'>{directionValueText}deg</div>
        ) : null}
      </div>
    </div>
  );
}

export default function GUI() {
  const setClicked = GameState((state) => state.setClicked);
  const booleans = GameState((state) => state.booleans);
  const setBoolean = GameState((state) => state.setBooleans);

  const { isStrength, isDirection, isThrow } = booleans;

  const dialRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  const dialValue = () => {
    const value =
      100 - parseInt(dialRef.current?.style.top?.slice(0, 2) as string);

    return value;
  };

  const arrowValue = () => {
    const value = parseInt(
      arrowRef.current?.style.transform.slice(7, 10) as string
    );

    return value;
  };

  const handleButtonClick = () => {
    if (!isStrength && !isDirection && !isThrow) {
      setBoolean("isStrength", true);
    } else if (!isDirection && !isThrow) {
      setBoolean("isDirection", true);
    } else if (!isThrow) {
      setClicked();
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
      <DirectionInput arrowRef={arrowRef} value={arrowValue()} />
      <StrengthSlider dialRef={dialRef} value={dialValue()} />
      <Button onClick={handleButtonClick} text={getButtonLabel()} />
    </>
  );
}
