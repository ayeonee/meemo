import { hourData, minData } from "../../../../constants/schedule";
import { Schedule } from "../../../../_types/schedule";
import { useSelector } from "react-redux";
import { RootState } from "../../../../reducers";
import style from "../../styles/InputBoxStyle.module.scss";
import style_mode from "../../styles/modeColor.module.scss";

interface InputTimeListProps {
  handleChange: React.ChangeEventHandler;
  schedule: Schedule;
}

export default function InputTimeList({
  handleChange,
  schedule,
}: InputTimeListProps) {
  const modeInfo = useSelector((state: RootState) => state.modeReducer.mode);
  const { startHour, startMin, endHour, endMin } = schedule;
  return (
    <div
      className={[
        style.select_wrapper,
        modeInfo === "light"
          ? style_mode.select_wrapper_light
          : style_mode.select_wrapper_dark,
      ].join(" ")}
    >
      <select name="startHour" value={startHour} onChange={handleChange}>
        {hourData.map((data) => (
          <option value={data} key={data}>
            {data < 10 ? `0${data}` : data}시
          </option>
        ))}
      </select>

      <select name="startMin" value={startMin} onChange={handleChange}>
        {minData.map((data) => (
          <option value={data} key={data}>
            {data < 10 ? `0${data}` : data}분
          </option>
        ))}
      </select>
      <h4>~</h4>
      <select name="endHour" value={endHour} onChange={handleChange}>
        {hourData.map((data) => (
          <option value={data} key={data}>
            {data < 10 ? `0${data}` : data}시
          </option>
        ))}
      </select>

      <select name="endMin" value={endMin} onChange={handleChange}>
        {minData.map((data) => (
          <option value={data} key={data}>
            {data < 10 ? `0${data}` : data}분
          </option>
        ))}
      </select>
    </div>
  );
}
