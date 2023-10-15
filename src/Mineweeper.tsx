import { FC, cloneElement, useState } from "react";
import Tile from "./Tile";

// Minesweeper board component

// Define props for the component
interface BoardProps {
  size: number,
  mines: number,
}

function countMines(board: JSX.Element[][], i: number, j: number) {
  let cnt = 0;
  for(let a=-1; a<=1; a++) {
    for(let b=-1; b<=1; b++) {
      if(a==0 && b==0) continue;
      if(i+a < 0 || j+b < 0 || i+a >= board.length || j+b >= board.length) continue;
      if(board[i+a][j+b].props.mine) cnt++;
    }
  }
  return cnt;
}

function revealTiles(board: JSX.Element[][], i: number, j: number) {
  board[i][j] = cloneElement(board[i][j], {revealed: true})
  if(board[i][j].props.value != 0 || board[i][j].props.mine) return;
  for(let a=-1; a<=1; a++) {
    for(let b=-1; b<=1; b++) {
      if(a==0 && b==0) continue
      if(i+a < 0 || j+b < 0 || i+a >= board.length || j+b >= board.length) continue
      if(!board[i+a][j+b].props.mine  && !board[i+a][j+b].props.revealed) revealTiles(board,i+a,j+b)
    }
  }
}

// Generate the board based on given props
function generateBoard(size: number, mines: number, handleTileFlip: Function, handleFlag: Function): JSX.Element[][] {
  const board: JSX.Element[][] = [];

  // Create an empty board
  for (let i = 0; i < size; i++) {
    const row: JSX.Element[] = [];
    for (let j = 0; j < size; j++) {
      row.push(
        <Tile
          key={`tile-${i}-${j}`}
          row={i}
          col={j}
          mine={false}
          flagged={false}
          revealed={false} // Initialize all tiles as not revealed
          value={0} // You can set the value to any default value you want
          onflip={handleTileFlip}
          onflag={handleFlag}
        />
      );
    }
    board.push(row);
  }

  // Generate Mines
  let m = 0;
  while (m < mines) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);
    if (!board[x][y].props.mine) {
      board[x][y] = cloneElement(board[x][y], { mine: true });
      m += 1;
    }
  }

  // Generate number values for tiles
  for(let i=0; i<board.length; i++) {
    for(let j=0; j<board.length; j++) {
      board[i][j] = cloneElement(board[i][j], {value: countMines(board,i,j)})
    }
  }

  return board;
}

const Minesweeper: FC<BoardProps> = (props) => {
  const [board, setBoard] = useState(generateBoard(props.size, props.mines, handleTileFlip, handleFlag));

  function handleTileFlip(i: number, j: number) {
    if(board[i][j].props.mine) {
      alert("Game Over")
    }
    const updatedBoard = [...board];
    revealTiles(updatedBoard,i,j);
    setBoard(updatedBoard);
  }

  function handleFlag(i: number, j: number) {
    const updatedBoard = [...board];
    updatedBoard[i][j] = cloneElement(updatedBoard[i][j], {flagged: !board[i][j].props.flagged})
    setBoard(updatedBoard);
  }

  return (
    <div className="minesweeper-board">
      {board.map((row, i) => (
        <div className="board-row" key={`row-${i}`}>
          {row}
        </div>
      ))}
    </div>
  );
};

export default Minesweeper;
