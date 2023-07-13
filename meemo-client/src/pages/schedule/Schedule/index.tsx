import React from "react";
import { AllData } from "../../../_types/schedule";
import ScheduleItem from "./ScheduleItem";
import style from "../styles/Schedule.module.scss";

interface ScheduleListProps {
  allData: AllData;
  removeData: Function;
}

function ScheduleList({ allData, removeData }: ScheduleListProps) {
  return (
    <div className={style.schedule_list}>
      {allData.map((item) =>
        item.schedule.map((scheduleItem) => (
          <ScheduleItem
            data={item}
            {...scheduleItem}
            key={scheduleItem.index}
            removeData={removeData}
          />
        ))
      )}
    </div>
  );
}

export default React.memo(ScheduleList);
