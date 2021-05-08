import React, { useCallback, useState } from "react";
import useConfirm from "../../../hooks/useConfirm";
import { daysData, colorCode } from "../../../_data/scheduleData";
import { Data, Schedule } from "../../../_types/scheduleTypes";
import style from "../styles/ScheduleStyle.module.scss";

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
  const scheduleTime = (endHour - startHour) * 60 + (endMin - startMin);
  const timeStart = 48 + 73 * (startHour - 8) + startMin * 1.2;
  const color = (id.length + place.length) % 6;
  const timeLength = scheduleTime * 1.2;

  const scheduleHeight = (scheduleTime: number, timeLength: number) => {
    let length;

    if (scheduleTime <= 60) {
      length = timeLength - 4;
    } else if (scheduleTime > 60 && scheduleTime <= 120) {
      length = timeLength - 3;
    } else if (scheduleTime > 120 && scheduleTime <= 180) {
      length = timeLength - 2;
    } else if (scheduleTime > 180 && scheduleTime <= 240) {
      length = timeLength - 1;
    } else if (scheduleTime > 300 && scheduleTime <= 360) {
      length = timeLength + 1;
    } else if (scheduleTime > 360 && scheduleTime <= 420) {
      length = timeLength + 2;
    } else if (scheduleTime > 420 && scheduleTime <= 480) {
      length = timeLength + 3;
    } else if (scheduleTime > 480 && scheduleTime <= 540) {
      length = timeLength + 4;
    } else if (scheduleTime > 540 && scheduleTime <= 600) {
      length = timeLength + 5;
    } else if (scheduleTime > 600 && scheduleTime <= 660) {
      length = timeLength + 6;
    } else if (scheduleTime > 660 && scheduleTime <= 720) {
      length = timeLength + 7;
    } else if (scheduleTime > 720 && scheduleTime <= 780) {
      length = timeLength + 8;
    } else {
      length = timeLength;
    }

    return length;
  };

  const datePosition = (date: number | string) => {
    let position;
    switch (date) {
      case 1:
        position = 18.45;
        break;

      case 2:
        position = 29.82;
        break;

      case 3:
        position = 41.24;
        break;

      case 4:
        position = 52.68;
        break;

      case 5:
        position = 64.16;
        break;

      case 6:
        position = 75.56;
        break;

      default:
        position = 18.5;
    }
    return position;
  };

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
      className={style.schedule_item}
      style={{
        left: `${datePosition(date)}%`,
        top: `${timeStart}px`,
        height: `${scheduleHeight(scheduleTime, timeLength)}px`,
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
      <div className={style.item_content}>
        <div className={style.item_name}>{name}</div>
        <div className={style.item_place}>
          {timeLength >= 54 ? place : null}
        </div>
        {timeLength >= 54 ? (
          <div className={style.item_time}>
            {startHour < 10 ? `0${startHour}` : startHour}:
            {startMin < 10 ? `0${startMin}` : startMin}&nbsp;~&nbsp;
            {endHour < 10 ? `0${endHour}` : endHour}:
            {endMin < 10 ? `0${endMin}` : endMin}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default React.memo(ScheduleItem);
