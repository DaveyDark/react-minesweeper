import { FC } from "react";

// This component represents a tile on the minesweeper board

// Properties of the tile component
interface TileProps {
  mine: boolean,
  revealed: boolean,
  flagged: boolean,
  row: number,
  col: number,
  onflip: Function,
  onflag: Function,
  value?: number,
}

const Tile: FC<TileProps> = (props) => {
  function handleFlip() {
    if(props.revealed || props.flagged) return;
    props.onflip(props.row, props.col)
  }

  function handleFlag(e: any) {
    e.preventDefault()
    props.onflag(props.row, props.col)
  }

  return (
    <div 
      className={`board-tile ${props.revealed && "tile-revealed"} ${props.mine && "tile-mine"} `} 
      onClick={() => handleFlip()}
      onContextMenu={(e) => handleFlag(e)}
    >
      <div className="tile-inner">
        <div className={`tile-front ${props.flagged && "tile-flagged"}`}><div></div></div>
        <div className="tile-back"><div>{props.value}</div></div>
      </div>
    </div>
  )
}

export default Tile
