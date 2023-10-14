import { FC } from "react";

// This component represents a tile on the minesweeper board

// Properties of the tile component
interface TileProps {
  mine: boolean,
  revealed: boolean,
  row: number,
  col: number,
  onflip: Function,
  value?: number,
}

const Tile: FC<TileProps> = (props) => {
  function handleFlip() {
    if(props.revealed) return;
    props.onflip(props.row, props.col)
  }

  return (
    <div className={`board-tile ${props.revealed ? "tile-revealed": ""} ${props.mine ? "tile-mine":""}`} onClick={() => handleFlip()}>
      <div className="tile-inner">
        <div className="tile-front"><div></div></div>
        <div className="tile-back"><div>{props.value}</div></div>
      </div>
    </div>
  )
}

export default Tile
