import style from "./DashBoard.module.scss";
import TodaySchedule from "./todaySchedule";
import RecentModify from "./recentModify";

export default function DashBoardPage(): JSX.Element {
  return (
    <div className={style.dashboard_wrapper}>
      <div className={style.dashboard}>
        <div className={style.line_one}>
          <TodaySchedule />
          <RecentModify />
        </div>
        <div className={style.line_two}>
          <p>해야 할 일</p>
          <p>그래프</p>
        </div>
      </div>
    </div>
  );
}
