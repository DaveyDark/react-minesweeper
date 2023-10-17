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
  flags: number,
  mines: number,
}

export interface GameOptions {
  size: number,
  mines: number,
}

export interface OptionsProps {
  size: number,
  mines: number,
  onChangeHandler: Function,
  resetBoard: Function,
  regenBoard: Function,
}

