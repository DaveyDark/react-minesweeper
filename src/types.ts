export interface BoardProps {
  size: number,
  mines: number,
  board: TileOptions[][],
}

export interface TileOptions {
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

export interface TileProps {
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

export interface StatsProps {
  resetBoard: Function,
  regenBoard: Function,
  flags: number,
  mines: number,
}

export interface GameOptions {
  size: number,
  mines: number,
}

