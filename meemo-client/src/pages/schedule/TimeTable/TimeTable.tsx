import { daysData, hourData } from "../../../_data/scheduleData";
import TimeTableGrid from "./TimeTableGrid";
import style from "../styles/TimeTableStyle.module.scss";

export default function TimeLine(): JSX.Element {
  return (
    <div className={style.table_wrapper}>
      <table className={style.table_header}>
        <tbody>
          <tr>
            <th className={style.table_null_head}></th>
            {daysData.map((data) => (
              <td className={style.day} key={data.id}>
                {data.name}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <table className={style.table_body}>
        <tbody className={style.times}>
          {hourData.map((data) => (
            <tr>
              <td className={style.time} key={data}>
                {data < 10 ? `0${data}` : data}시
              </td>
              {daysData.map((days) => (
                <TimeTableGrid key={days.id} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
