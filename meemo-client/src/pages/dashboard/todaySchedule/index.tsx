import style from "../DashBoard.module.scss";
import { ScheduleData } from "./scheduleData";
import ShowScheduleInfo from "./showScheduleInfo";

type ScheduleInfo = {
  name: string;
  place: string;
  startHour: number;
  startMin: number;
  endHour: number;
  endMin: number;
};

type ScheduleInfoArray = Array<ScheduleInfo>;

function TodaySchedule(): JSX.Element {
  const date = new Date();
  const today = date.getDay(); //일:0~토:6
  const scheduleInfo: ScheduleInfoArray = [];

  ScheduleData.forEach((item) => {
    item.schedule.forEach((scheduleItem) => {
      if (scheduleItem.date === today) {
        scheduleInfo.push({
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
          <ul className={style.schedule_list}>
            {scheduleInfo.map((item) => (
              <li>
                <ShowScheduleInfo
                  name={item.name}
                  place={item.place}
                  startHour={item.startHour}
                  startMin={item.startMin}
                  endHour={item.endHour}
                  endMin={item.endMin}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TodaySchedule;