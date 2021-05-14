import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AllData } from "../../../_types/scheduleTypes";
import { BASE_URL } from "../../../_data/urlData";
import { UserIdType } from "../../../_types/authTypes";
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

function TodaySchedule({ userIdInfo }: UserIdType): JSX.Element {
  const history = useHistory();
  const date = new Date();
  const today = date.getDay(); //일:0~토:6
  const [allData, setAllData] = useState<AllData>([]);
  const [scheduleInfo, setScheduleInfo] = useState<ScheduleInfo[]>([]);

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

  const goSchedulePage = () => {
    history.push({
      pathname: `/schedule`,
    });
  };

  const getTodayData = () => {
    allData.forEach((item) =>
      item.schedule.forEach((scheduleItem) => {
        if (scheduleItem.date === today) {
          setScheduleInfo((scheduleInfo) => [
            ...scheduleInfo,
            {
              id: item.id,
              name: item.name,
              place: item.place,
              startHour: scheduleItem.startHour,
              startMin: scheduleItem.startMin,
              endHour: scheduleItem.endHour,
              endMin: scheduleItem.endMin,
            },
          ]);
        }
      })
    );
  };

  useEffect(() => {
    getTodayData();
  }, [allData, today]);

  useEffect(() => {
    getSchedule(userIdInfo);
  }, []);

  return (
    <div className={style.today_schedule}>
      <div className={style.today_wrapper}>
        <div className={style.title}>TODAY'S SCHEDULE</div>
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
              <div className={style.schedule_list}>
                <b>오늘은 일정이 없습니다.</b>
              </div>
            ) : (
              <div className={style.schedule_list}>
                <b>{scheduleInfo[0].name}</b>
                <p>{scheduleInfo[0].place}</p>
                <p>
                  {scheduleInfo[0].startHour}:
                  {scheduleInfo[0].startMin === 0
                    ? "00"
                    : scheduleInfo[0].startMin}{" "}
                  ~ {scheduleInfo[0].endHour}:
                  {scheduleInfo[0].endMin === 0 ? "00" : scheduleInfo[0].endMin}
                </p>
                <span>외 {scheduleInfo.length - 1}개의 일정</span>
              </div>
            )}
          </div>

          <div className={style.see_detail} onClick={() => goSchedulePage()}>
            자세히 보기
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodaySchedule;
