import { FC, useEffect, useState } from "react";
import { GameState } from "./enums";
import { useGameStateContext } from "./context";
import { StatsProps } from "./types"

const StatsDisplay: FC<StatsProps> = (props) => {
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState<any>(null);

  const [gameState, _] = useGameStateContext()

  useEffect(() => {
    if(gameState == GameState.started) {
      setTime(0)
      const timer = setInterval(() => {
        setTime((last) => last+1)
      },1000)
      setTimer(timer)
    } else if(gameState == GameState.over || gameState == GameState.won) {
      clearInterval(timer)
    } else {
      if(timer) clearInterval(timer)
      setTime(0)
    }
  }, [gameState])

  return (
    <div className="content-block stats-display">
      <h2>
        {gameState == GameState.waiting && "Click a tile to Start"}
        {gameState == GameState.started && "Keep going!"}
        {gameState == GameState.won && "You Win!"}
        {gameState == GameState.over && "Game Over"}
      </h2>
      <span 
        className={`stat-block ${gameState != GameState.over && gameState != GameState.won ? 'time-block-started':'time-block'}`}>
          <i className="fa-regular fa-clock" />{time.toString().padStart(3, '0')}
      </span>
      <span 
        className="stat-block flags-block">
          <i className="fa-solid fa-flag" />{props.flags.toString().padStart(3, '0')}

      </span>
      <span 
        className="stat-block mines-block">
          <i className="fa-solid fa-bomb" />{(props.mines - props.flags).toString().padStart(3, '0')}
      </span>
    </div>
  )
}

export default StatsDisplay
