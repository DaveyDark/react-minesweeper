import { FC, cloneElement, useState } from "react";
import Tile from "./Tile";

// Minesweeper board component

// Define props for the component
interface BoardProps {
  size: number,
  mines: number,
}

// Generate the board based on given props
function generateBoard(size: number, mines: number, handleTileFlip: Function): JSX.Element[][] {
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
          mine={false} // Initialize all tiles as not mines
          revealed={false} // Initialize all tiles as not revealed
          value={0} // You can set the value to any default value you want
          onflip={handleTileFlip}
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


  return board;
}

const Minesweeper: FC<BoardProps> = (props) => {
  const [board, setBoard] = useState(generateBoard(props.size, props.mines, handleTileFlip));

  function handleTileFlip(i: number, j: number) {
    const updatedBoard = [...board];
    updatedBoard[i][j] = cloneElement(board[i][j], {
      revealed: true,
    });
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
