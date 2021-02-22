import React, { useCallback, useState } from "react";
import useConfirm from "../../../lib/hooks/useConfirm";
import { daysData, colorCode } from "../../../lib/data/scheduleData";
import { ISchedule } from "../../../lib/types/scheduleTypes";
import style from "./ScheduleStyle.module.scss";

interface Props {
  id: number;
  name: string;
  place: string;
  index: number;
  removeData: Function;
}

const ScheduleItem: React.FC<Props & ISchedule> = ({
  id,
  name,
  place,
  index,
  removeData,
  ...scheduleItem
}) => {
  const [delButtonState, setDelButtonState] = useState<boolean>(false);
  const { date, startHour, startMin, endHour, endMin } = scheduleItem;
  const datePosition = 84 + 96 * (date - 1);
  const scheduleTime = (endHour - startHour) * 60 + (endMin - startMin);
  const timeStart = 43 + 72 * (startHour - 8) + startMin * 1.2;
  const timeHeight = scheduleTime * 1.2 - 12;
  const color = id % 6;

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
    onClickDelButton
  );

  return (
    <div
      className={style.schedule_item_wrapper}
      style={{
        left: `${datePosition}px`,
        top: `${timeStart}px`,
        height: `${timeHeight}px`,
        backgroundColor: `#${colorCode[color]}`,
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
        <div style={{ fontSize: `${timeHeight < 34 ? 11 : 12}px` }}>
          {name.length > 7 ? `${name.slice(0, 6)}...` : name}
        </div>
        <div>{timeHeight >= 54 ? place : null}</div>
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
};

export default React.memo(ScheduleItem);
