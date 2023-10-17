import { FC, useEffect, useState } from "react";
import { GameState } from "./enums";
import { useGameStateContext } from "./context";
import { StatsProps } from "./types"

const StatsDisplay: FC<StatsProps> = (props) => {
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
    } else {
      if(timer) clearInterval(timer)
      setTime(0)
    }
  }, [gameState])

  return (
    <div className="content-block stats-display">
      <span className="controls-container">
        {gameState == GameState.waiting && <i onClick={() => setState(GameState.started)} className="control-button play-button fa-solid fa-play"/>}
        {gameState == GameState.started && <i onClick={() => setState(GameState.over)} className="control-button pause-button fa-solid fa-stop"/>}
        {gameState == GameState.over && <i onClick={() => props.resetBoard()} className="control-button restart-button fa-solid fa-rotate-right"/>}
        <i onClick={() => props.regenBoard()} className="control-button reset-button fa-solid fa-rotate"/>
      </span>
      <span 
        className={`stat-block ${gameState != GameState.over ? 'time-block-started':'time-block'}`}>
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
