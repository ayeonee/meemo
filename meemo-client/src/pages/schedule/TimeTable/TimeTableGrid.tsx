import style from "../styles/TimeTableStyle.module.scss";

export default function TimeLineGrid() {
  return (
    <td className={style.cols}>
      <div className={style.grid_top}></div>
      <div className={style.grid_bottom}></div>
    </td>
  );
}
