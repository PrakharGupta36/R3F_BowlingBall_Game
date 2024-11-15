import "../../../css/pinStatus.css";
import { GameState } from "../../../hooks/GameState";

export default function PinStatus() {
  const pinData = GameState((set) => set.pinsData);

  const fallenPins = pinData.filter((pin) => pin.positionY !== 0.124);

  return (
    <div className='pin_status'>
      <div className='pin_card'>
        <p> Pins knocked over {fallenPins.length} out of 10 </p>
      </div>
    </div>
  );
}
