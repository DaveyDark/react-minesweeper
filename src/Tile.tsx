import { FC } from "react";
import { useGameStateContext } from "./context";

// This component represents a tile on the minesweeper board

// Properties of the tile component
interface TileProps {
  mine: boolean,
  revealed: boolean,
  flagged: boolean,
  row: number,
  col: number,
  bgRotation: number,
  onflip: Function,
  onflag: Function,
  value: number,
}

const Tile: FC<TileProps> = (props) => {
  const [gameState, setState] = useGameStateContext()

  function handleFlip() {
    if(props.revealed || props.flagged) return;
    props.onflip(props.row, props.col, gameState, setState)
  }

  function handleFlag(e: any) {
    e.preventDefault()
    props.onflag(props.row, props.col, gameState, setState)
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

  const tileStyle = {
    background: `url("data:image/svg+xml,<svg id='patternId' width='10em' height='10em' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='100' height='100' patternTransform='scale(1) rotate(${props.bgRotation})'><rect x='0' y='0' width='100%' height='100%' fill='hsla(170,39.5%,59.8%,1)'/><path d='M19.95-15.33L18.32-.68 16.7 13.97l13.5-5.92 13.5-5.91L31.82-6.6zM62 68.18l21.15-23.32 9.62 29.98zm2.64-.85l26.08 5.64-8.15-25.4zm-44.7 17.42l-1.63 14.64-1.63 14.66 13.5-5.92 13.5-5.92-11.87-8.73z'  stroke-width='1' stroke='none' fill='hsla(198,63.3%,38.4%,1)'/><path d='M96.78 82.3a3.74 3.74 0 104.93-5.65 3.74 3.74 0 00-5.3.37 3.76 3.76 0 00.37 5.28zm-47.2-69.69l3.44-.23-.23-3.45-3.44.24zm-3.37 45.7a1.5 1.5 0 002.1-.15 1.5 1.5 0 00-.14-2.1 1.5 1.5 0 00-2.1.15 1.5 1.5 0 00.14 2.1zm24.66-45.06A8.5 8.5 0 1082.07.43a8.5 8.5 0 10-11.2 12.82zM-3.3 82.3a3.74 3.74 0 104.93-5.65 3.74 3.74 0 00-5.29.37 3.76 3.76 0 00.36 5.28zm74.17 31.03a8.5 8.5 0 1011.2-12.82 8.5 8.5 0 10-11.2 12.82zm6.34-78.02c-2.44.5-5.05-.5-7.13-2.7-.28-.3-.43-.68-.41-1.1a1.5 1.5 0 011.56-1.46c.4 0 .78.17 1.06.47 1.37 1.45 2.9 2.1 4.33 1.8 1.41-.28 2.58-1.47 3.28-3.35 1.06-2.84 3.08-4.77 5.52-5.26 2.44-.5 5.05.5 7.13 2.7.54.57.56 1.43.06 2.02l-.12.13c-.6.57-1.57.54-2.14-.07-1.37-1.45-2.9-2.1-4.32-1.8-1.42.28-2.6 1.47-3.29 3.35-.92 2.46-2.54 4.22-4.55 4.97-.32.14-.64.24-.98.3zm8.64-9.5c1.73-.34 3.56.4 5.15 2.08a.63.63 0 00.94-.03c.2-.24.2-.6-.03-.83-1.87-1.98-4.17-2.87-6.3-2.43-2.14.43-3.91 2.15-4.86 4.7-.82 2.17-2.22 3.55-3.95 3.91-1.73.35-3.56-.38-5.15-2.07a.62.62 0 00-1.08.41c-.01.17.05.32.17.45 1.87 1.98 4.17 2.87 6.3 2.43 2.14-.43 3.91-2.15 4.87-4.7.7-1.89 1.85-3.18 3.28-3.72.2-.08.43-.15.66-.2zM39.33 79.5c.54 0 1-.4 1.07-.96.32-2.86-.55-5.34-2.39-6.8-1.83-1.45-4.44-1.72-7.15-.74-2.03.73-3.84.58-5.11-.41-1.26-1-1.82-2.73-1.58-4.87a1.08 1.08 0 00-.94-1.2 1.08 1.08 0 00-1.19.95c-.32 2.87.54 5.35 2.38 6.8 1.84 1.45 4.44 1.72 7.15.75 2.04-.73 3.85-.58 5.12.41 1.25 1 1.82 2.73 1.57 4.87a1.08 1.08 0 001.07 1.2z'  stroke-width='1' stroke='none' fill='hsla(1,85.2%,65.5%,1)'/><path d='M6.7 27.57l18.65-5.83 5.84 18.64-18.65 5.84zm17.68-3.97l-15.8 4.96 4.94 15.8 15.81-4.95zm78.1-33.38l-9.04 3.62 3.62 9.05 9.04-3.62zm3.68 67.2l-9.67 2.99.57 1.86 9.67-3zM55.35 89.61l.7 1.74 12.14-4.87-.7-1.74zm5.28-48.27l1.32-.91-12.24-17.66-1.32.92zM2.4-9.78l-9.04 3.62 3.62 9.04L6.02-.74zm3.68 67.2l-9.67 3 .57 1.85 9.67-2.99zm96.4 32.88l-9.05 3.62 3.62 9.04 9.04-3.62zM2.4 90.3l-9.05 3.62 3.63 9.04 9.04-3.62z'   stroke-width='1' stroke='none' fill='hsla(48,100%,70%,1)'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>")`,
  };

  return (
    <div 
      className={`board-tile ${props.revealed && "tile-revealed"} ${props.mine && "tile-mine"} `} 
      onClick={() => handleFlip()}
      style={props.revealed ? {transform: 'scale(0.95)'} : {}}
      onContextMenu={(e) => handleFlag(e)}
    >
      <div className="tile-inner">
        <div className={`tile-front ${props.flagged && "tile-flagged"}`} style={props.flagged ? {} : tileStyle}>
          <i className={`${props.flagged && "fa-solid fa-flag"}`}/>
        </div>
        <div className={`tile-back ${backClass}`}>
          <div>{props.value > 0 && !props.mine && props.value}{props.mine && <i className="fa-solid fa-bomb"/>}</div>
        </div>
      </div>
    </div>
  )
}

export default Tile
