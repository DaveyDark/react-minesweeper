import { useState } from "react";
import Minesweeper from "./Mineweeper";
import OptionsDisplay from "./OptionsDisplay";
import StatsDisplay from "./StatsDisplay";

interface GameOptions {
  size: number,
  mines: number,
}

export default function App() {
  const [options, setOptions] = useState<GameOptions>({size: 9, mines: 10})

  function changeOptions(newOptions: Partial<GameOptions>) {
    const opt = {...options, ...newOptions}
    opt.mines = Math.floor(Math.min(opt.size*opt.size*0.3, opt.mines))
    setOptions(opt)
  }

  return (
    <>
      <StatsDisplay started={false} />
      <div className="main-content">
      <h1>Minesweeper</h1>
      <Minesweeper {...options} />
      </div>
      <OptionsDisplay {...options} onChangeHandler={changeOptions} />
    </>
  )
}

