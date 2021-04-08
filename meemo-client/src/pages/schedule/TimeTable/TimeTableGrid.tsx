import { allTimeData } from "../../../_data/scheduleData";
import style from "./TimeTableStyle.module.scss";

export default function TimeLineGrid(): JSX.Element {
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
}
