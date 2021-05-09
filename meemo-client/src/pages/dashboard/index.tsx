import style from "./DashBoard.module.scss";
import Weather from "./weather";
import StickyMemo from "./stickyMemo";
import TodaySchedule from "./todaySchedule";
import RecentModify from "./recentModify";
import TodoList from "./todoList";
import BlockPage from "../block/index";

export default function DashBoardPage(): JSX.Element {
  return (
    // <>
    //   {block ? (
    //     <div className={style.dashboard_wrapper}>
    //       <div className={style.dashboard}>
    //         <div className={style.line_one}>
    //           <UserGraph />
    //           <RecentModify />
    //         </div>
    //         <div className={style.line_two}>
    //           <TodaySchedule />
    //           <TodoList />
    //         </div>
    //       </div>
    //     </div>
    //   ) : (
    //     <BlockPage />
    //   )}
    // </>

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
