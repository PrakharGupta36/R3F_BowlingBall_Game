import { useRef } from "react";
import { GameState } from "../../hooks/GameState";
import Button from "../ui/Button";
import DirectionInput from "./components/DirectionInput";
import StrengthSlider from "./components/StrengthSlider";
import "../../css/gui.css";
import PinStatus from "./components/PinStatus";

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
      setClicked(true);
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

  const isIntroCompleted = GameState((state) => state.isIntroCompleted);

  return (
    <>
      <DirectionInput arrowRef={arrowRef} value={arrowValue()} />
      <StrengthSlider dialRef={dialRef} value={dialValue()} />
      <PinStatus />
      <Button
        onClick={handleButtonClick}
        text={getButtonLabel()}
        addedClassName='btn-game'
        disabled={!isIntroCompleted}
      />
    </>
  );
}
