import style from "./DashBoard.module.scss";
import TodaySchedule from "./todaySchedule";
import RecentModify from "./recentModify";
import TodoList from "./todoList";
import UserGraph from "./userGraph";

export default function DashBoardPage(): JSX.Element {
  return (
    <div className={style.dashboard_wrapper}>
      <div className={style.dashboard}>
        <div className={style.line_one}>
          <UserGraph />
          <RecentModify />
        </div>
        <div className={style.line_two}>
          <TodaySchedule />
          <TodoList />
        </div>
      </div>
    </div>
  );
}
