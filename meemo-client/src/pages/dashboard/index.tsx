import style from './DashBoard.module.scss';
import TodaySchedule from './todaySchedule';

export default function DashBoardPage(): JSX.Element {
  return (
    <div className={style.dashboard_wrapper}>
      <div className={style.dashboard}>
        <div className={style.line_one}>
          <TodaySchedule />
          <p>최근 수정</p>
        </div>
        <div className={style.line_two}>
          <p>해야 할 일</p>
          <p>그래프</p>
        </div>
      </div>
    </div>
  );
}
