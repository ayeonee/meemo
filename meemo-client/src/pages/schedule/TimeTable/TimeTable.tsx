import { daysData, hourData } from "../../../lib/data/scheduleData";
import TimeTableGrid from "./TimeTableGrid";
import style from "./TimeTableStyle.module.scss";

const TimeLine: React.FC = () => {
  return (
    <div className={style.table_wrapper}>
      <table className={style.table_header}>
        <tbody>
          <tr>
            <th></th>
            {daysData.map((data) => (
              <td className={style.day} key={data.id}>
                {data.name}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <table className={style.table_body}>
        <tbody>
          <tr>
            <th className={style.times}>
              {hourData.map((data) => (
                <div className={style.time} key={data}>
                  {data < 10 ? `0${data}` : data}시
                </div>
              ))}
            </th>

            {daysData.map((days) => (
              <TimeTableGrid key={days.id} />
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TimeLine;
