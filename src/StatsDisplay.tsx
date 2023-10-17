import { FC, useEffect, useState } from "react";
import { GameState } from "./enums";
import { useGameStateContext } from "./context";

interface StatsProps {
}

const StatsDisplay: FC<StatsProps> = () => {
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState<any>(null);

  const [gameState, setState] = useGameStateContext()

  useEffect(() => {
    if(gameState == GameState.started) {
      setTime(0)
      const timer = setInterval(() => {
        setTime((last) => last+1)
      },1000)
      setTimer(timer)
    } else if(gameState == GameState.over) {
      clearInterval(timer)
    }
  }, [gameState])

  function handlePlay() {
    if(gameState == GameState.waiting) setState(GameState.started)
  }

  function handleStop() {
    if(gameState == GameState.started) setState(GameState.over)
  }

  return (
    <div className="content-block stats-display">
      <span className="controls-container">
        {gameState != GameState.started && <i onClick={handlePlay} className="control-button play-button fa-solid fa-play"/>}
        {gameState == GameState.started && <i onClick={handleStop} className="control-button pause-button fa-solid fa-stop"/>}
        <i className="control-button restart-button fa-solid fa-rotate-right"/>
        <i className="control-button reset-button fa-solid fa-rotate"/>
      </span>
      <span className={`stat-block ${gameState != GameState.over ? 'time-block-started':'time-block'}`}><i className="fa-regular fa-clock" />{time.toString().padStart(3, '0')}</span>
      <span className="stat-block flags-block"><i className="fa-solid fa-flag" />00</span>
      <span className="stat-block mines-block"><i className="fa-solid fa-bomb" />10</span>
    </div>
  )
}

export default StatsDisplay
