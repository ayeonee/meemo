import { useCallback, useRef, useState } from "react";
import { AllData, Data } from "../../types/scheduleTypes";
import InputButton from "./Input/InputButton";
import ScheduleList from "./Schedule/ScheduleList";
import TimeTable from "./TimeTable";
import style from "./Schedule.module.scss";

export default function SchedulePage(): JSX.Element {
  const [allData, setAllData] = useState<AllData>([]);
  const nextId = useRef<number>(1);

  const addData = useCallback((elem: Data) => {
    setAllData((allData) =>
      allData.concat({
        ...elem,
        id: nextId.current,
      })
    );
    nextId.current += 1;
  }, []);

  const removeData = useCallback(
    (index: number, id: number) => {
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
    },
    [allData]
  );
  return (
    <div className={style.schedule}>
      <div className={style.time_line_wrapper}>
        <InputButton addData={addData} allData={allData} />
        <div className={style.schedule_list_wrapper}>
          {allData.length >= 1 ? (
            <ScheduleList allData={allData} removeData={removeData} />
          ) : null}
          <TimeTable />
        </div>
      </div>
    </div>
  );
}
