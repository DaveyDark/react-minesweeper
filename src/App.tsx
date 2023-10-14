import Minesweeper from "./Mineweeper";

export default function App() {
  return (
    <>
      <h1>Minesweeper</h1>
      <Minesweeper size={9} mines={10} />
    </>
  )
}

