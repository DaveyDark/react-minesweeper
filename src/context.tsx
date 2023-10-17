import { createContext, useContext } from "react";
import { GameState } from "./enums";

export const GameStateContext = createContext<[GameState, any]>([GameState.waiting, null])

export const useGameStateContext = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};

