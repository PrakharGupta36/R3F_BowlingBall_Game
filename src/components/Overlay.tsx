import { isMobile, isTablet } from "react-device-detect";
import { GameState } from "../hooks/GameState";
import Button from "./ui/Button";

export default function Overlay() {
  const setIsIntroCompleted = GameState((state) => state.setIsIntroCompleted);

  return (
    <div className='overlay_container'>
      <div className='overlay_container_inner'>
        <h1>R3F Bowling Ball Game</h1>
        <p> /* Knock over the pins in least amount of tries */ </p>
        <Button
          onClick={() => setIsIntroCompleted(true)}
          text='Enter'
          addedClassName=''
          disabled={false}
        />

        {isMobile || isTablet ? (
          <p className='info'>
            {" "}
            Textures may appear different in mobile, view in <br /> desktop for
            full experience{" "}
          </p>
        ) : null}
      </div>
    </div>
  );
}
