import { isMobile, isTablet } from "react-device-detect";
import { GameState } from "../hooks/GameState";
import Button from "./ui/Button";

export default function Overlay() {
  const setIsIntroCompleted = GameState((state) => state.setIsIntroCompleted);

  const music = GameState((state) => state.music);
  const setMusic = GameState((state) => state.setMusic);

  const sounds = GameState((state) => state.sounds);
  const setSounds = GameState((state) => state.setSounds);

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

        <div className='sounds_btns'>
          <Button
            onClick={() => setMusic(!music)}
            text={music ? "Turn off music" : "Turn on music"}
            addedClassName=''
            disabled={false}
          />
          <Button
            onClick={() => setSounds(!sounds)}
            text={sounds ? "Turn off sounds" : "Turn on sounds"}
            addedClassName=''
            disabled={false}
          />
        </div>

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
