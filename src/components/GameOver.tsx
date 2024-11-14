import Button from "./ui/Button";
import "../css/gameOver.css";
import { GameState } from "../hooks/GameState";
import { AnimatePresence, motion } from "framer-motion";

export default function GameOver({
  minutes,
  seconds,
}: {
  minutes: number;
  seconds: number;
}) {
  const tries = GameState((state) => state.tries);

  return (
    <AnimatePresence>
      <motion.div
        className='game_over'
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className='game_over_inner'>
          <div>
            <h1>
              You got all pins down <br /> in {tries} tries
            </h1>

            <p>
              {" "}
              Congratrulations, you have wasted {minutes} minutes and {seconds} seconds of your
              life in this game
            </p>
          </div>

          <Button
            onClick={() => location.reload()}
            text='Play again'
            disabled={false}
            addedClassName=''
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
