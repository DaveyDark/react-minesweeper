import { FC } from "react";

interface StatsProps {
  started: boolean,
}

const StatsDisplay: FC<StatsProps> = (props) => {
  return (
    <div className="content-block stats-display">
      <span className="controls-container">
        {props.started || <i className="control-button play-button fa-solid fa-play"/>}
        {props.started && <i className="control-button pause-button fa-solid fa-pause"/>}
        <i className="control-button restart-button fa-solid fa-rotate-right"/>
        <i className="control-button reset-button fa-solid fa-rotate"/>
      </span>
      <span className="stat-block time-block"><i className="fa-regular fa-clock" />051</span>
      <span className="stat-block flags-block"><i className="fa-solid fa-flag" />00</span>
      <span className="stat-block mines-block"><i className="fa-solid fa-bomb" />10</span>
    </div>
  )
}

export default StatsDisplay
