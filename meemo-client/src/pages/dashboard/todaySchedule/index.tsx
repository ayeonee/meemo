import style from "../DashBoard.module.scss";
import { ScheduleData } from "./scheduleData";

type ScheduleInfo = {
  id: string;
  name: string;
  place: string;
  startHour: number;
  startMin: number;
  endHour: number;
  endMin: number;
};

function TodaySchedule(): JSX.Element {
  const date = new Date();
  const today = date.getDay(); //일:0~토:6
  const scheduleInfo: ScheduleInfo[] = [];

  ScheduleData.forEach((item) => {
    item.schedule.forEach((scheduleItem) => {
      if (scheduleItem.date === today) {
        scheduleInfo.push({
          id: item.id,
          name: item.name,
          place: item.place,
          startHour: scheduleItem.startHour,
          startMin: scheduleItem.startMin,
          endHour: scheduleItem.endHour,
          endMin: scheduleItem.endMin,
        });
      }
    });
  });

  return (
    <div className={style.today_schedule}>
      <div className={style.title}>Today's Schedule</div>
      <div className={style.today_info}>
        {date.getMonth() + 1}월 {date.getDate()}일{" "}
        {today === 1
          ? "월"
          : today === 2
          ? "화"
          : today === 3
          ? "수"
          : today === 4
          ? "목"
          : today === 5
          ? "금"
          : today === 6
          ? "토"
          : "일"}
        요일
      </div>
      <div className={style.schedule_wrapper}>
        {scheduleInfo.length === 0 ? (
          <p>오늘은 일정이 없습니다.</p>
        ) : (
          <div>
            {scheduleInfo.map((item) => (
              <div className={style.schedule_list} key={item.id}>
                <b>{item.name}</b>
                <p>{item.place}</p>
                <p>
                  {item.startHour}:{item.startMin} ~ {item.endHour}:
                  {item.endMin}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TodaySchedule;
