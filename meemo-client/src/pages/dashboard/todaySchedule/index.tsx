import style from '../DashBoard.module.scss';
import { ScheduleData } from './scheduleData';
import ShowScheduleInfo from './showScheduleInfo';

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
      if (scheduleItem.date === 2) {
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
      <h3>Today's Schedule</h3>
      <p>
        {today === 0
          ? '월'
          : today === 1
          ? '화'
          : today === 2
          ? '수'
          : today === 3
          ? '목'
          : today === 4
          ? '금'
          : today === 5
          ? '토'
          : '일'}
        요일
      </p>
      <p>
        {scheduleInfo.length === 0 ? (
          '오늘은 일정이 없습니다.'
        ) : (
          <ul>
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
      </p>
    </div>
  );
}

export default TodaySchedule;
