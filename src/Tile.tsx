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
  value: number,
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

  switch(props.value) {
    case 0:
      var backClass = 'tile-safe'
      break
    case 1:
      var backClass = 'tile-unsafe'
      break
    case 2:
      var backClass = 'tile-risky'
      break
    case 3:
      var backClass = 'tile-dangerous'
      break
    default:
      var backClass = 'tile-dangerous'
  }

  return (
    <div 
      className={`board-tile ${props.revealed && "tile-revealed"} ${props.mine && "tile-mine"} `} 
      onClick={() => handleFlip()}
      onContextMenu={(e) => handleFlag(e)}
    >
      <div className="tile-inner">
        <div className={`tile-front ${props.flagged && "tile-flagged"}`}>
          <i className={`${props.flagged && "fa-solid fa-flag"}`}/>
        </div>
        <div className={`tile-back ${backClass}`}>
          <div>{props.value > 0 && props.value}</div>
        </div>
      </div>
    </div>
  )
}

export default Tile
