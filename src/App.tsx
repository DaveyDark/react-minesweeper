import { useEffect, useReducer, useState } from "react";
import Board from "./Board";
import OptionsDisplay from "./OptionsDisplay";
import StatsDisplay from "./StatsDisplay";
import { GameState } from "./enums";
import { GameStateContext } from "./context";
import { GameOptions, TileOptions } from "./types";

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

function countFlags(board: TileOptions[][]) {
  let cnt = 0;
  board.map(row => {
    row.map(tile => {
      if(tile.flagged)cnt++
    })
  })
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

interface ResetBoardAction {
  type: "RESET_BOARD",
  payload: {}
}

type Action = TileRevealAction | TileFlagAction | NewBoardAction | ResetBoardAction;

const boardReducer = (board: TileOptions[][], action: Action): TileOptions[][] => {
  if(action.type == "NEW_BOARD") {
    return generateBoard(action.payload.size, action.payload.mines, action.payload.handleTileFlip, action.payload.handleFlag)
  }
  let updatedBoard = board.map((row) => row.map((tile) => ({ ...tile })))
  if(action.type == "RESET_BOARD") {
    return updatedBoard.map(row => {
      return row.map(tile => {
        return {...tile, revealed: false, flagged: false}
      })
    })
  }
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

export default function App() {
  const [options, setOptions] = useState<GameOptions>({size: 9, mines: 10})
  const [board, dispatch] = useReducer(boardReducer, generateBoard(options.size, options.mines, handleTileFlip, handleFlag));
  const [gameState, setState] = useState(GameState.waiting)

  function handleTileFlip(i: number, j: number, gameState: GameState, setState: Function) {
    if(gameState == GameState.over || gameState == GameState.won) return
    if(gameState == GameState.waiting) setState(GameState.started)
    dispatch({type: "TILE_REVEAL", payload: {row: i, col: j}})
  }

  function handleFlag(i: number, j: number, gameState: GameState, setState: Function) {
    if(gameState == GameState.over || gameState == GameState.won) return
    if(gameState == GameState.waiting) setState(GameState.started)
    dispatch({type: "TILE_FLAG", payload: {row: i, col: j}})
  }

  function resetBoard() {
    setState(GameState.waiting)
    dispatch({type: "RESET_BOARD", payload: {}})
  }

  function regenBoard() {
    setState(GameState.waiting)
    dispatch({type: "NEW_BOARD", payload: {size: options.size, mines: options.mines, handleTileFlip: handleTileFlip, handleFlag: handleFlag}})
  }

  useEffect(() => {
    regenBoard()
  }, [options.size, options.mines]);

  //Check Game Over
  if(gameState == GameState.started) {
    let gameOver = true
    let gameWon = true
    board.map(row => {
      row.map(tile => {
        if(!tile.mine && !tile.revealed) gameOver = false
        if(!tile.mine && !tile.revealed) gameWon = false
        if(tile.mine && tile.revealed) gameWon = false
      })
    })
    if(gameWon) setState(GameState.won)
    else if(gameOver) setState(GameState.over)
  }

  function changeOptions(newOptions: Partial<GameOptions>) {
    const opt = {...options, ...newOptions}
    opt.mines = Math.floor(Math.min(opt.size*opt.size*0.3, opt.mines))
    setOptions(opt)
  }

  return (
    <GameStateContext.Provider value={[gameState,setState]}>
      <StatsDisplay mines={options.mines} flags={countFlags(board)} />
      <div className="main-content">
      <h1>MINESWEEPER</h1>
      <Board {...options} board={board} />
      </div>
      <OptionsDisplay {...options} resetBoard={resetBoard} regenBoard={regenBoard} onChangeHandler={changeOptions} />
    </GameStateContext.Provider>
  )
}

