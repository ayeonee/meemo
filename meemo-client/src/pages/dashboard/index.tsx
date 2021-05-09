import style from "./styles/DashBoard.module.scss";
import Weather from "./weather";
import StickyMemo from "./stickyMemo";
import TodaySchedule from "./todaySchedule";
import RecentModify from "./recentModify";
import TodoList from "./todoList";

export default function DashBoardPage(): JSX.Element {
  return (
    <div className={style.dashboard_wrapper}>
      <div className={style.dashboard}>
        <div className={style.line_one}>
          <TodaySchedule />
          <TodoList />
        </div>
        <div className={style.line_two}>
          <RecentModify />
          <StickyMemo />
          <Weather />
        </div>
      </div>
    </div>
  );
}
