import { allTimeData } from "../../../data/scheduleData";
import style from "./TimeTableStyle.module.scss";

const TimeLineGrid: React.FC = () => {
  return (
    <td>
      <div className={style.cols}>
        <div className={style.grids}>
          {allTimeData.map((data) => (
            <div className={style.grid} key={data}></div>
          ))}
        </div>
      </div>
    </td>
  );
};

export default TimeLineGrid;