import React, { useCallback, useState } from "react";
import useConfirm from "../../../hooks/useConfirm";
import { colorCode } from "../../../constants/schedule";
import { Data, Schedule } from "../../../_types/scheduleTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import style from "../styles/ScheduleItem.module.scss";
import style_mode from "../styles/modeColor.module.scss";

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
  const modeInfo = useSelector((state: RootState) => state.modeReducer.mode);
  const { id, name, place } = data;
  const { date, startHour, startMin, endHour, endMin, code } = scheduleItem;
  const [delButtonState, setDelButtonState] = useState<boolean>(false);
  const scheduleTime = (endHour - startHour) * 60 + (endMin - startMin);
  const timeStart = 48 + 73 * (startHour - 8) + startMin * 1.2;
  const color = (id.length + place.length) % 6;
  const timeLength = scheduleTime * 1.2 - 0.5;

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
        position = 41.2;
        break;

      case 4:
        position = 52.6;
        break;

      case 5:
        position = 64;
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
    removeData(id, code);
  };

  const confirmDelete = useConfirm(
    "해당시간표를 삭제하시겠습니까?",
    onClickDelButton
  );

  return (
    <div
      className={[
        style.schedule_item,
        modeInfo === "light"
          ? style_mode.schedule_item_light
          : style_mode.schedule_item_dark,
      ].join(" ")}
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
        <span onClick={confirmDelete}> &#215;</span>
      </div>
      <div className={style.item_content}>
        <p className={style.item_name}>{name}</p>
        <p className={style.item_place}>{timeLength >= 54 ? place : null}</p>
        {timeLength >= 54 ? (
          <p className={style.item_time}>
            {startHour < 10 ? `0${startHour}` : startHour}:
            {startMin < 10 ? `0${startMin}` : startMin}&nbsp;~&nbsp;
            {endHour < 10 ? `0${endHour}` : endHour}:
            {endMin < 10 ? `0${endMin}` : endMin}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default React.memo(ScheduleItem);
