import { useState, useCallback, useRef } from "react";
import {
  DataProps,
  ScheduleArray,
  Data,
  Input,
} from "../../../_types/scheduleTypes";
import InputText from "./InputText";
import InputDayTime from "./InputDayTime";
import style from "../styles/InputBoxStyle.module.scss";

interface ModalTypes {
  modalState: boolean;
  closeModal: Function;
}

export default function InputBox({
  modalState,
  closeModal,
  addData,
  allData,
}: ModalTypes & DataProps): JSX.Element {
  const nextIndex = useRef<number>(2);
  const checkTimeCorrect = useRef<boolean>(false);
  const checkOverlap = useRef<boolean>(false);
  const resetDays = useRef<any>();
  const [input, setInput] = useState<Input>({
    name: "",
    place: "",
  });
  const [schedule, setSchedule] = useState<ScheduleArray>([
    {
      index: 1,
      date: 1,
      startHour: 8,
      startMin: 0,
      endHour: 8,
      endMin: 0,
    },
  ]);

  const resetData = () => {
    setInput({
      name: "",
      place: "",
    });
    setSchedule([
      {
        index: 1,
        date: 1,
        startHour: 8,
        startMin: 0,
        endHour: 8,
        endMin: 0,
      },
    ]);
    nextIndex.current = 2;
  };

  const onClickResetDays = () => {
    resetDays.current.resetDays();
  };

  const onChangeTime = useCallback(
    (index: number, name: string, value: number) => {
      setSchedule((schedule) =>
        schedule.map((schedule) =>
          schedule.index === index
            ? {
                ...schedule,
                [name]: value,
              }
            : schedule
        )
      );
    },
    []
  );

  const onChangeTxt = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    },
    [input]
  );

  const compareStates = useCallback((elem: Data, schedule: ScheduleArray) => {
    elem.schedule.forEach((elem) => {
      const { date, startHour, startMin, endHour, endMin } = elem;

      schedule.forEach((scheduleElem) => {
        if (date === scheduleElem.date) {
          if (
            (endHour == scheduleElem.startHour &&
              endMin <= scheduleElem.startMin) ||
            endHour < scheduleElem.startHour
          ) {
            checkOverlap.current = false;
          } else if (
            (startHour == scheduleElem.endHour &&
              startMin >= scheduleElem.startMin) ||
            startHour > scheduleElem.endHour
          ) {
            checkOverlap.current = false;
          } else if (
            endHour == scheduleElem.startHour &&
            endMin == scheduleElem.startMin &&
            scheduleElem.endMin - scheduleElem.startMin >= 30
          ) {
            checkOverlap.current = false;
          } else {
            checkOverlap.current = true;
            return;
          }
        }
      });
    });
  }, []);

  const compareAllData = (schedule: ScheduleArray) => {
    allData.forEach((elem) => {
      compareStates(elem, schedule);
    });
  };

  const handleAddData = () => {
    if (input.name === "") {
      alert("강의명을 입력해 주세요");
      return;
    }

    compareAllData(schedule);
    if (checkOverlap.current) {
      alert("중복된 시간표가 있습니다");
      checkOverlap.current = false;
      return;
    }

    schedule.forEach((elem) => {
      const { startHour, startMin, endHour, endMin } = elem;
      if (startHour < endHour && startMin - endMin <= 30) {
        checkTimeCorrect.current = true;
      } else if (startHour === endHour) {
        if (endMin > startMin && endMin - startMin >= 30) {
          checkTimeCorrect.current = true;
        } else {
          checkTimeCorrect.current = false;
        }
      } else {
        checkTimeCorrect.current = false;
      }
    });

    if (checkTimeCorrect.current === true) {
      addData({ ...input, schedule: schedule });
      onClickResetDays();
      resetData();
    } else {
      alert("정확한 시간(최소 30분)을 입력해 주세요");
      checkTimeCorrect.current = true;
      return;
    }
  };

  const addNewDayTime = () => {
    if (schedule.length > 3) {
      alert("최대 4타임까지만 중복입력 가능합니다");
      return;
    }

    const newData = {
      index: nextIndex.current,
      date: 1,
      startHour: 8,
      startMin: 0,
      endHour: 8,
      endMin: 0,
    };

    setSchedule(schedule.concat(newData));
    nextIndex.current += 1;
  };

  const removeDayTime = useCallback(
    (index) => {
      const result = schedule.filter((elem) => elem.index !== index);
      setSchedule(result);
    },
    [schedule]
  );

  const closeModalInside = () => {
    resetData();
    closeModal();
  };

  return (
    <>
      {modalState ? (
        <div className={style.input_wrapper}>
          <button className={style.close_button} onClick={closeModalInside}>
            ×
          </button>

          <div className={style.input_wrapper_sub}>
            <div className={style.input_title}>
              <h3>강의명</h3>
              <h3>장소</h3>
              <h3>날짜/시간</h3>
            </div>

            <div className={style.input_body}>
              <InputText input={input} onChangeTxt={onChangeTxt} />

              {schedule.map((schedule) => (
                <InputDayTime
                  key={schedule.index}
                  onChangeTime={onChangeTime}
                  schedule={schedule}
                  index={schedule.index}
                  removeDayTime={removeDayTime}
                  ref={schedule.index === 1 ? resetDays : null}
                />
              ))}
            </div>
          </div>

          <button className={style.add_new_daytime} onClick={addNewDayTime}>
            +
          </button>

          <button className={style.input_box_button} onClick={handleAddData}>
            추가하기
          </button>
        </div>
      ) : null}
    </>
  );
}
