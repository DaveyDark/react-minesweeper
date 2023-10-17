import { FC } from "react";
import Tile from "./Tile";
import { BoardProps } from "./types";

// Minesweeper board component

const Board: FC<BoardProps> = (props) => {
  return (
    <div className="minesweeper-board">
      {props.board.map((row, i) => (
        <div className="board-row" key={`row-${i}`}>
          {row.map((tile) => 
            <Tile {...tile} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Board
