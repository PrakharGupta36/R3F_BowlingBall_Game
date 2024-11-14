import { useAnimationControls } from "framer-motion";
import { GameState } from "../../../hooks/GameState";
import { useEffect, useState } from "react";
import { submitValueStrength } from "../../../utils/helperFunctions";
import { motion } from "framer-motion";

type StrengthSliderProps = {
  dialRef: React.RefObject<HTMLDivElement>;
  value: number;
};

export default function StrengthSlider({
  dialRef,
  value,
}: StrengthSliderProps) {
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
          duration: 0.8,
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
