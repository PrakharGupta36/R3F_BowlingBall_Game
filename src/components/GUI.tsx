import { GameState } from "../hooks/GameState";
// import { gsap } from "gsap";
// import { useGSAP } from "@gsap/react";

import Button from "./ui/Button";

function StrengthSlider() {
  // useGSAP(() => {
  //   gsap;
  // });
  return (
    <div className='strength'>
      <div className='strength_bar'>
        <div className='strength_bar_dial'></div>
      </div>
    </div>
  );
}

export default function GUI() {
  const setClicked = GameState((state) => state.setClicked);
  const booleans = GameState((state) => state.booleans);
  const setBoolean = GameState((state) => state.setBooleans);

  const { isStrength, isDirection, isThrow } = booleans;

  const handleButtonClick = () => {
    if (!isStrength && !isDirection && !isThrow) {
      console.log("Selecting Strength");
    } else if (!isDirection && !isThrow) {
      console.log("Selecting Direction");
    } else if (!isThrow) {
      setClicked(); // Trigger the 'Throw Ball' action
      setBoolean("isThrow", true);

      console.log(booleans);
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
      <StrengthSlider />
      <Button onClick={handleButtonClick} text={getButtonLabel()} />
    </>
  );
}
