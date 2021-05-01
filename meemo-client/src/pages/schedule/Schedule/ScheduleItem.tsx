import React, { useCallback, useState } from "react";
import useConfirm from "../../../hooks/useConfirm";
import { daysData, colorCode } from "../../../_data/scheduleData";
import { Data, Schedule } from "../../../_types/scheduleTypes";
import style from "./ScheduleStyle.module.scss";

interface ScheduleItemProps {
  data: Data;
  removeData: Function;
}

function ScheduleItem({
  data,
  index,
  removeData,
  ...scheduleItem
}: ScheduleItemProps & Schedule): JSX.Element {
  const { id, name, place } = data;
  const { date, startHour, startMin, endHour, endMin } = scheduleItem;

  const [delButtonState, setDelButtonState] = useState<boolean>(false);

  const datePosition = 82 + 96 * (date - 1);
  const scheduleTime = (endHour - startHour) * 60 + (endMin - startMin);
  const timeStart = 39 + 72 * (startHour - 8) + startMin * 1.2;
  const timeHeight = scheduleTime * 1.2 - 5;
  const color = (id.length + place.length) % 6;

  const showDelButton = useCallback(() => {
    if (!delButtonState) {
      setDelButtonState(true);
    } else {
      setDelButtonState(false);
    }
  }, [delButtonState]);

  const onClickDelButton = () => {
    removeData(index, id);
  };

  const confirmDelete = useConfirm(
    "해당시간표를 삭제하시겠습니까?",
    onClickDelButton,
    () => null
  );

  return (
    <div
      className={style.schedule_item_wrapper}
      style={{
        left: `${datePosition}px`,
        top: `${timeStart}px`,
        height: `${timeHeight}px`,
        borderLeft: `4px solid #${colorCode[color]}`,
      }}
      onMouseOver={showDelButton}
      onMouseOut={showDelButton}
    >
      <div
        className={style.item_delete_button}
        style={{
          display: delButtonState ? "flex" : "none",
        }}
      >
        <p onClick={confirmDelete}>×</p>
      </div>
      <div style={{ lineHeight: `${timeHeight < 34 ? "12px" : "1.0"}` }}>
        <div
          style={{ fontSize: `${timeHeight < 34 ? 11 : 15}px` }}
          className={style.item_name}
        >
          {name}
        </div>
        <div className={style.item_place}>
          {timeHeight >= 54 ? place : null}
        </div>
        <div>{timeHeight >= 70 ? `${daysData[date - 1].name}요일` : null}</div>
        <div style={{ fontSize: `${timeHeight < 34 ? 11 : 12}px` }}>
          {startHour < 10 ? `0${startHour}` : startHour}:
          {startMin < 10 ? `0${startMin}` : startMin}~
          {endHour < 10 ? `0${endHour}` : endHour}:
          {endMin < 10 ? `0${endMin}` : endMin}
        </div>
      </div>
    </div>
  );
}

export default React.memo(ScheduleItem);
