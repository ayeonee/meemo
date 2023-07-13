import { useState, useCallback, useRef } from "react";
import {
  DataProps,
  ScheduleArray,
  Data,
  Input,
} from "../../../_types/schedule";
import InputText from "./InputText";
import InputDayTime from "./InputDayTime";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import style from "../styles/InputBoxStyle.module.scss";
import style_mode from "../styles/modeColor.module.scss";

interface ModalTypes {
  modalState: boolean;
  closeModal: Function;
}

const DEFAULT_SCHEDULE = [
  {
    index: 1,
    date: 1,
    startHour: 8,
    startMin: 0,
    endHour: 8,
    endMin: 0,
    code: "default-code",
  },
];

export default function InputBox({
  modalState,
  closeModal,
  addData,
  allData,
}: ModalTypes & DataProps) {
  const modeInfo = useSelector((state: RootState) => state.modeReducer.mode);
  const nextIndex = useRef<number>(2);
  const checkTimeCorrect = useRef<boolean>(false);
  const checkOverlap = useRef<boolean>(false);
  const resetDays = useRef<any>();
  const [input, setInput] = useState<Input>({
    name: "",
    place: "",
  });
  const [schedule, setSchedule] = useState<ScheduleArray>(DEFAULT_SCHEDULE);

  const resetData = () => {
    setInput({
      name: "",
      place: "",
    });
    setSchedule(DEFAULT_SCHEDULE);
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
                code: `${Math.floor(Math.random() * 1001) + index}`,
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

  const compareStates = (elem: Data, schedule: ScheduleArray) => {
    elem.schedule.forEach((elem) => {
      const { date, startHour, startMin, endHour, endMin } = elem;

      schedule.forEach((scheduleElem) => {
        if (date === scheduleElem.date) {
          if (
            endHour === scheduleElem.startHour &&
            scheduleElem.startMin - endMin >= 0
          ) {
            checkOverlap.current = false;
          } else if (scheduleElem.startHour - endHour >= 1) {
            checkOverlap.current = false;
          } else if (
            startHour === scheduleElem.endHour &&
            startMin - scheduleElem.endMin >= 0
          ) {
            checkOverlap.current = false;
          } else if (startHour - scheduleElem.endHour >= 1) {
            checkOverlap.current = false;
          } else {
            checkOverlap.current = true;
            return;
          }
        }
      });
    });
  };

  const compareAllData = (schedule: ScheduleArray) => {
    allData.forEach((elem) => {
      compareStates(elem, schedule);
    });
  };

  const handleAddData = () => {
    if (input.name === "") {
      alert("일정을 입력해 주세요");
      return;
    } else {
      compareAllData(schedule);

      if (checkOverlap.current) {
        alert("중복된 시간표가 있습니다");
        checkOverlap.current = false;
        return;
      } else {
        schedule.forEach((elem) => {
          const { startHour, startMin, endHour, endMin } = elem;

          if (startHour == endHour && endMin - startMin >= 30) {
            checkTimeCorrect.current = false;
          } else if (endHour - startHour >= 2) {
            checkTimeCorrect.current = false;
          } else if (endHour - startHour == 1 && startMin - endMin <= 30) {
            checkTimeCorrect.current = false;
          } else {
            checkTimeCorrect.current = true;
          }
        });

        if (checkTimeCorrect.current === false) {
          addData({ ...input, schedule: schedule });
          onClickResetDays();
          resetData();
        } else {
          alert("정확한 시간(최소 30분)을 입력해 주세요");
          checkTimeCorrect.current = false;

          return;
        }
      }
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
      code: "default-code",
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
        <div
          className={[
            style.blur_background,
            modeInfo === "light"
              ? style_mode.blur_background_light
              : style_mode.blur_background_dark,
          ].join(" ")}
        >
          <div
            className={[
              style.input_wrapper,
              modeInfo === "light"
                ? style_mode.input_wrapper_light
                : style_mode.input_wrapper_dark,
            ].join(" ")}
          >
            <button className={style.close_button} onClick={closeModalInside}>
              &#215;
            </button>

            <div className={style.input_wrapper_sub}>
              <div
                className={[
                  style.input_title,
                  modeInfo === "light"
                    ? style_mode.input_title_light
                    : style_mode.input_title_dark,
                ].join(" ")}
              >
                <h3>일정</h3>
                <h3>장소</h3>
                <h3>날짜/시간</h3>
              </div>

              <div className={style.input_body}>
                <InputText
                  input={input}
                  onChangeTxt={onChangeTxt}
                  modeInfo={modeInfo}
                />

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

            <button
              className={[
                style.input_box_button,
                modeInfo === "light"
                  ? style_mode.input_box_button_light
                  : style_mode.input_box_button_dark,
              ].join(" ")}
              onClick={handleAddData}
            >
              추가하기
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
