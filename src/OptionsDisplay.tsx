import { FC } from "react";

interface OptionsProps {
  size: number,
  mines: number,
  onChangeHandler: Function,
}

const OptionsDisplay: FC<OptionsProps> = (props) => {
  return (
    <div className="content-block options-display">
      <h2>Options</h2>
      <label htmlFor="size-input"><h4>Board Size</h4><i className="muted-text">{props.size + 'x' + props.size}</i></label>
      <input id="size-input" type="range" min={5} max={16} onChange={(e) => props.onChangeHandler({size: Number(e.target.value)})} value={props.size}/>
      <label htmlFor="mines-input"><h4>Mines</h4><i className="muted-text">{props.mines}</i></label>
      <input id="mines-input" type="range" min={1} max={Math.floor(props.size * props.size * 0.3)} onChange={(e) => props.onChangeHandler({mines: Number(e.target.value)})} value={props.mines}/>
    </div>
  )
}

export default OptionsDisplay
