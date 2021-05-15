import { useCallback, useState, useEffect } from "react";
import { AllData, Data } from "../../_types/scheduleTypes";
import useConfirm from "../../hooks/useConfirm";
import axios from "axios";
import InputButton from "./Input/InputButton";
import ScheduleList from "./Schedule/ScheduleList";
import TimeTable from "./TimeTable";
import style from "./styles/Schedule.module.scss";
import reset from "../../img/reset-icon.svg";
import { BASE_URL } from "../../_data/urlData";
import { useSelector } from "react-redux";
import { RootState } from "../../_reducers";

export default function SchedulePage(): JSX.Element {
  const [allData, setAllData] = useState<AllData>([]);
  const [addDataCheck, setAddDataCheck] = useState<boolean>(false);
  const [resetDataCheck, setResetDataCheck] = useState<boolean>(false);
  const [deleteDataCheck, setDeleteDataCheck] = useState<boolean>(false);
  const userIdInfo = useSelector(
    (state: RootState) => state.userReducer.userData.userId
  );

  const saveSchedule = (payloadData: AllData) => {
    axios({
      method: "POST",
      baseURL: BASE_URL,
      url: "/save/schedule",
      data: {
        userId: userIdInfo,
        payload: payloadData,
      },
    })
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

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
    getSchedule(userIdInfo);
  }, []);

  useEffect(() => {
    if (addDataCheck) {
      saveSchedule(allData);
    }

    return setAddDataCheck(false);
  }, [allData, addDataCheck]);

  useEffect(() => {
    if (deleteDataCheck) {
      saveSchedule(allData);
    }

    return setDeleteDataCheck(false);
  }, [allData, deleteDataCheck]);

  useEffect(() => {
    if (resetDataCheck) {
      saveSchedule(allData);
    }

    return setResetDataCheck(false);
  }, [allData, resetDataCheck]);

  const addData = (elem: Data) => {
    setAllData((allData) =>
      allData.concat({
        ...elem,
        id: elem.name,
      })
    );

    setAddDataCheck(true);
  };

  const removeData = useCallback(
    (index: number, id: string) => {
      if (allData.length === 1 && allData[0].schedule.length === 1) {
        setAllData([]);
        saveSchedule([]);
      } else {
        setAllData(
          allData
            .map((elem) =>
              elem.id === id
                ? {
                    ...elem,
                    schedule: elem.schedule.filter(
                      (scheduleItem) => scheduleItem.index !== index
                    ),
                  }
                : elem
            )
            .filter((elem) => elem.schedule.length > 0)
        );

        setDeleteDataCheck(true);
      }
    },
    [allData]
  );

  const resetAllData = () => {
    setAllData([]);
    setAddDataCheck(true);
  };

  const resetAllSchedule = useConfirm(
    "시간표를 초기화 하시겠습니까?",
    resetAllData,
    () => null
  );

  return (
    <div className={style.schedule}>
      <div className={style.time_line_wrapper}>
        <InputButton addData={addData} allData={allData} />
        <div className={style.reset_button} onClick={resetAllSchedule}>
          <img src={`${reset}`} alt="reset icon" />
        </div>
        <div className={style.schedule_list_wrapper}>
          <TimeTable />
        </div>
        <div className={style.schedule_items_wrapper}>
          {allData.length >= 1 ? (
            <ScheduleList allData={allData} removeData={removeData} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
