import React, {
  useCallback,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { daysData } from "../../../../_data/scheduleData";
import { Schedule } from "../../../../types/scheduleTypes";
import InputDayList from "./InputDayList";
import InputTimeList from "./InputTimeList";
import style from "../InputBoxStyle.module.scss";

interface Props {
  index: number;
  onChangeTime: Function;
  removeDayTime: Function;
  schedule: Schedule;
  ref: any;
}

const InputDayTime: React.FC<Props> = forwardRef(
  ({ index, onChangeTime, schedule, removeDayTime }, ref) => {
    const [daysArray, setDaysArray] = useState(daysData);

    const handleClick = useCallback(
      (e) => {
        onChangeTime(index, "date", e.target.value);
      },
      [index, onChangeTime]
    );

    const handleChange = useCallback(
      (e) => {
        const { name, value } = e.target;
        onChangeTime(index, name, value);
      },
      [index, onChangeTime]
    );

    const handleToggle = useCallback((id: number) => {
      setDaysArray((daysInfo) =>
        daysInfo.map((data) =>
          data.id === id
            ? { ...data, checked: true }
            : { ...data, checked: false }
        )
      );
    }, []);

    const remove = () => {
      removeDayTime(index);
    };

    useImperativeHandle(ref, () => ({
      resetDays() {
        setDaysArray((daysInfo) =>
          daysInfo.map((data) =>
            data.id === 1
              ? { ...data, checked: true }
              : { ...data, checked: false }
          )
        );
      },
    }));

    return (
      <>
        {index > 1 ? (
          <button className={style.daytime_delete} onClick={remove}>
            삭제
          </button>
        ) : null}
        <ol className={style.day_check_wrapper} onClick={handleClick}>
          {daysArray.map((data) => (
            <InputDayList
              data={data}
              handleToggle={handleToggle}
              key={data.id}
            />
          ))}
        </ol>
        <InputTimeList schedule={schedule} handleChange={handleChange} />
      </>
    );
  }
);

export default InputDayTime;
