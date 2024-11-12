import { useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import { GameState } from "../../../hooks/GameState";
import { motion } from "framer-motion";
import { submitValueDirection } from "../../../utils/helperFunctions";


type DirectionInputProps = {
  arrowRef: React.RefObject<HTMLDivElement>;
  value: number;
};

export default function DirectionInput({
  arrowRef,
  value,
}: DirectionInputProps) {
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
