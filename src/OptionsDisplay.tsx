import { FC } from "react";
import { OptionsProps } from "./types";
import { GameState } from "./enums";
import { useGameStateContext } from "./context";

const OptionsDisplay: FC<OptionsProps> = (props) => {
  const [gameState, setState] = useGameStateContext()

  return (
    <div className="content-block options-display">
      <span className="controls-container">
        {gameState == GameState.waiting && <i onClick={() => setState(GameState.started)} className="control-button play-button fa-solid fa-play"/>}
        {gameState == GameState.started && <i onClick={() => setState(GameState.over)} className="control-button pause-button fa-solid fa-stop"/>}
        {(gameState == GameState.over || gameState == GameState.won) && <i onClick={() => props.resetBoard()} className="control-button restart-button fa-solid fa-rotate-right"/>}
        <i onClick={() => props.regenBoard()} className="control-button reset-button fa-solid fa-rotate"/>
      </span>
      <div className="option-group">
      <label htmlFor="size-input"><h4>Board Size</h4><i className="muted-text">{props.size + 'x' + props.size}</i></label>
      <input id="size-input" type="range" min={5} max={16} onChange={(e) => props.onChangeHandler({size: Number(e.target.value)})} value={props.size}/>
      </div>
      <div className="option-group">
      <label htmlFor="mines-input"><h4>Mines</h4><i className="muted-text">{props.mines}</i></label>
      <input id="mines-input" type="range" min={1} max={Math.floor(props.size * props.size * 0.3)} onChange={(e) => props.onChangeHandler({mines: Number(e.target.value)})} value={props.mines}/>
      </div>
    </div>
  )
}

export default OptionsDisplay
