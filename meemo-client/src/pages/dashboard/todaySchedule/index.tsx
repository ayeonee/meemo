import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AllData } from "../../../_types/scheduleTypes";
import { BASE_URL } from "../../../_data/urlData";
import axios from "axios";
import style from "../styles/TodaySchedule.module.scss";

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
  const history = useHistory();
  const date = new Date();
  const today = date.getDay(); //일:0~토:6
  const [allData, setAllData] = useState<AllData>([]);

  const scheduleInfo: ScheduleInfo[] = [];

  const getSchedule = async (userId: string | null) => {
    await axios({
      method: "POST",
      baseURL: BASE_URL,
      url: "/get/schedule",
      data: {
        userId: userId,
      },
    })
      .then((res) => {
        setAllData(res.data.payload);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getSchedule(localStorage.getItem("meemo-user-id"));
  }, []);

  allData.forEach((item) => {
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

  const goSchedulePage = () => {
    history.push({
      pathname: `/schedule`,
    });
  };

  return (
    <div className={style.today_schedule}>
      <div className={style.today_wrapper}>
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
      </div>
      <div className={style.schedule_wrapper}>
        <div className={style.schedule_box}>
          <div className={style.schedule_container}>
            {scheduleInfo.length === 0 ? (
              <p>오늘은 일정이 없습니다.</p>
            ) : (
              <div>
                {scheduleInfo.map((item) => (
                  <div className={style.schedule_list} key={item.id}>
                    <b>{item.name}</b>
                    <p>{item.place}</p>
                    <p>
                      {item.startHour}:{item.startMin === 0 ? "00" : item.startMin} ~ {item.endHour}
                      :{item.endMin === 0 ? "00" : item.endMin}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={style.see_detail} onClick={() => goSchedulePage()}>
            자세히 보기 &gt;
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodaySchedule;
