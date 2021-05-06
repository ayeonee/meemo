import { useEffect, useState } from "react";
import style from "./DashBoard.module.scss";
import TodaySchedule from "./todaySchedule";
import RecentModify from "./recentModify";
import TodoList from "./todoList";
import UserGraph from "./userGraph";
import BlockPage from "../block/index";

export default function DashBoardPage(): JSX.Element {
  const [block, setBlock] = useState<boolean>(false);

  useEffect(() => {
    const userId = localStorage.getItem("meemo-user-id");
    if (userId !== null) {
      setBlock(true);
    }
  }, []);
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
