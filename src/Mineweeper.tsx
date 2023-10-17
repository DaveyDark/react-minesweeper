import { FC, useEffect, useReducer} from "react";
import Tile from "./Tile";
import { GameState } from "./enums";
import { useGameStateContext } from "./context";

// Minesweeper board component

// Define props for the component
interface BoardProps {
  size: number,
  mines: number,
}

interface TileOptions {
  key: string,
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

function countMines(board: TileOptions[][], i: number, j: number) {
  let cnt = 0;
  for(let a=-1; a<=1; a++) {
    for(let b=-1; b<=1; b++) {
      if(a==0 && b==0) continue;
      if(i+a < 0 || j+b < 0 || i+a >= board.length || j+b >= board.length) continue;
      if(board[i+a][j+b].mine) cnt++;
    }
  }
  return cnt;
}

function revealTiles(board: TileOptions[][], i: number, j: number) {
  board[i][j] = {...board[i][j] , revealed: true}
  if(board[i][j].value != 0 || board[i][j].mine) return;
  for(let a=-1; a<=1; a++) {
    for(let b=-1; b<=1; b++) {
      if(a==0 && b==0) continue
      if(i+a < 0 || j+b < 0 || i+a >= board.length || j+b >= board.length) continue
      if(!board[i+a][j+b].mine  && !board[i+a][j+b].revealed) revealTiles(board,i+a,j+b)
    }
  }
}

// Generate the board based on given props
function generateBoard(size: number, mines: number, handleTileFlip: Function, handleFlag: Function): TileOptions[][] {
  const board: TileOptions[][] = [];

  // Create an empty board
  for (let i = 0; i < size; i++) {
    const row: TileOptions[] = [];
    for (let j = 0; j < size; j++) {
      row.push(
        {
          key:`tile-${i}-${j}`,
          row:i,
          col:j,
          bgRotation:Math.floor(Math.random() * 360),
          mine:false,
          flagged:false,
          revealed:false,
          value:0,
          onflip:handleTileFlip,
          onflag:handleFlag,
        }
      );
    }
    board.push(row);
  }

  // Generate Mines
  let m = 0;
  while (m < mines) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);
    if (!board[x][y].mine) {
      board[x][y] = {...board[x][y],  mine: true};
      m += 1;
    }
  }

  // Generate number values for tiles
  for(let i=0; i<board.length; i++) {
    for(let j=0; j<board.length; j++) {
      board[i][j] = {...board[i][j], value: countMines(board,i,j)}
    }
  }

  return board;
}

interface TileRevealAction {
  type: "TILE_REVEAL";
  payload: { row: number; col: number };
}

interface TileFlagAction {
  type: "TILE_FLAG";
  payload: { row: number; col: number };
}

interface NewBoardAction {
  type: "NEW_BOARD";
  payload: { size: number; mines: number; handleTileFlip: Function, handleFlag: Function };
}

type Action = TileRevealAction | TileFlagAction | NewBoardAction;

const boardReducer = (board: TileOptions[][], action: Action): TileOptions[][] => {
  if(action.type == "NEW_BOARD") {
    return generateBoard(action.payload.size, action.payload.mines, action.payload.handleTileFlip, action.payload.handleFlag)
  }
  let updatedBoard = board.map((row) => row.map((tile) => ({ ...tile })))
  const {row,col} = action.payload
  if(action.type == "TILE_REVEAL") {
    if (updatedBoard[row][col].mine) {
      updatedBoard = updatedBoard.map(row => {
        return row.map(tile => {
          return {...tile, revealed: true}
        })
      })
    } else {
      revealTiles(updatedBoard, row, col)
    }
  } else if (action.type == "TILE_FLAG") {
    updatedBoard[row][col] = {
      ...updatedBoard[row][col],
      flagged: !updatedBoard[row][col].flagged,
    };
  }
  return updatedBoard
}

const Minesweeper: FC<BoardProps> = (props) => {
  const [board, dispatch] = useReducer(boardReducer, generateBoard(props.size, props.mines, handleTileFlip, handleFlag));

  const [gameState, setState] = useGameStateContext()

  useEffect(() => {
    dispatch({type: "NEW_BOARD", payload: {size: props.size, mines: props.mines, handleTileFlip: handleTileFlip, handleFlag: handleFlag}})
  }, [props.size, props.mines]);

  function handleTileFlip(i: number, j: number, gameState: GameState, setState: Function) {
    if(gameState == GameState.over) return
    if(gameState == GameState.waiting) setState(GameState.started)
    dispatch({type: "TILE_REVEAL", payload: {row: i, col: j}})
  }

  function handleFlag(i: number, j: number, gameState: GameState, setState: Function) {
    if(gameState == GameState.over) return
    if(gameState == GameState.waiting) setState(GameState.started)
    dispatch({type: "TILE_FLAG", payload: {row: i, col: j}})
  }

  //Check Game Over
  if(gameState == GameState.started) {
    let gameOver = true
    board.map(row => {
      row.map(tile => {
        if(tile.mine && !tile.revealed) gameOver = false
      })
    })
    if(gameOver) setState(GameState.over)
  }

  return (
    <div className="minesweeper-board">
      {board.map((row, i) => (
        <div className="board-row" key={`row-${i}`}>
          {row.map((tile) => 
            <Tile {...tile} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Minesweeper;
