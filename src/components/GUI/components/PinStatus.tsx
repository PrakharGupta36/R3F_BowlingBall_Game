import "../../../css/pinStatus.css";
import { GameState } from "../../../hooks/GameState";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";

export default function PinStatus() {
  const pinData = GameState((set) => set.pinsData);

  return (
    <div className='pin_status'>
      <div className='pin_table'>
        {pinData.map((e) => {
          return (
            <div className='pin_card' key={e.id}>
              <p> Pin #{e.id} </p>
              {e.positionY !== 0.124 ? (
                <CheckIcon color='lightgreen' className='icon' scale={4} />
              ) : (
                <Cross2Icon color='red' className='icon' scale={4} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
