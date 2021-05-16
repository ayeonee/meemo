import { daysData, hourData } from "../../../_data/scheduleData";
import TimeTableGrid from "./TimeTableGrid";
import { useSelector } from "react-redux";
import { RootState } from "../../../_reducers";
import style from "../styles/TimeTableStyle.module.scss";
import style_mode from "../styles/modeColor.module.scss";

export default function TimeLine(): JSX.Element {
  const modeInfo = useSelector((state: RootState) => state.modeReducer.mode);

  return (
    <div className={style.table_wrapper}>
      <table
        className={[
          style.table_header,
          modeInfo === "light" ? style_mode.table_light : style_mode.table_dark,
        ].join(" ")}
      >
        <tbody>
          <tr>
            <th className={style.table_null_head}></th>
            {daysData.map((data, index) => (
              <td className={style.day} key={index}>
                {data.name}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <table className={style.table_body}>
        <tbody className={style.times}>
          {hourData.map((data, index) => (
            <tr key={index}>
              <td
                className={[
                  style.time,
                  modeInfo === "light"
                    ? style_mode.table_dark
                    : style_mode.table_light_second,
                ].join(" ")}
              >
                {data < 10 ? `0${data}` : data}시
              </td>
              {daysData.map((days, index) => (
                <TimeTableGrid key={index} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
