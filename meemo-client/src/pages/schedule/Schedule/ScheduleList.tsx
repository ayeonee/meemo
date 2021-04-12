import React from "react";
import { AllData } from "../../../_types/scheduleTypes";
import ScheduleItem from "./ScheduleItem";
import style from "./ScheduleStyle.module.scss";

type ScheduleListProps = {
  allData: AllData;
  removeData: Function;
};

function ScheduleList({ allData, removeData }: ScheduleListProps): JSX.Element {
  return (
    <div className={style.schedule_list}>
      {allData.map((item) =>
        item.schedule.map((scheduleItem) => (
          <ScheduleItem
            id={item.id}
            name={item.name}
            place={item.place}
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
