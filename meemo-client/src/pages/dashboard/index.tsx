import { useEffect } from "react";
import style from "./styles/DashBoard.module.scss";
import Weather from "./weather";
import StickyMemo from "./stickyMemo";
import TodaySchedule from "./todaySchedule";
import RecentModify from "./recentModify";
import TodoList from "./todoList";
import { useSelector } from "react-redux";
import { RootState } from "../../_userReducers";

export default function DashBoardPage(): JSX.Element {
  const userIdInfo = useSelector(
    (state: RootState) => state.user.userData.userId
  );

  useEffect(() => {
    console.log(userIdInfo);
  }, []);

  return (
    <div className={style.dashboard_wrapper}>
      <div className={style.dashboard}>
        <div className={style.line_one}>
          <TodaySchedule userIdInfo={userIdInfo} />
          <TodoList userIdInfo={userIdInfo} />
        </div>
        <div className={style.line_two}>
          <RecentModify userIdInfo={userIdInfo} />
          <StickyMemo userIdInfo={userIdInfo} />
          <Weather />
        </div>
      </div>
    </div>
  );
}
