import { useState } from "react";
import useConfirm from "../../../hooks/useConfirm";
import { useSelector } from "react-redux";
import { RootState } from "../../../_reducers";
import style from "../styles/CalendarModal.module.scss";
import style_mode from "../styles/modeColor.module.scss";
import RMDEditor from "rich-markdown-editor";

import moment from "moment";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

interface CalendarModalProps {
  modalType: string;
  toggleModal: () => void;
  selectInfo: any;
  submit: (evnt: object) => void;
  handleDelete: (id: string) => void;
}

export default function CalendarModal(props: CalendarModalProps): JSX.Element {
  const modeInfo = useSelector((state: RootState) => state.modeReducer.mode);
  const userIdInfo = useSelector(
    (state: RootState) => state.userReducer.userData.userId
  );
  const { modalType, toggleModal, selectInfo, submit, handleDelete } = props;

  const [userId, setUserId] = useState<string | null>(userIdInfo);

  const [title, setTitle] = useState<string>(selectInfo.title);
  const [allDay, setAllDay] = useState<boolean>(selectInfo.allDay);
  const [startDate, setStartDate] = useState<string>(selectInfo.startStr);
  const [endDate, setEndDate] = useState<string>(
    selectInfo.allDay
      ? moment(selectInfo.endStr).subtract(1, "days").format("YYYY-MM-DD")
      : selectInfo.endStr
  );

  const [startTime, setStartTime] = useState<string>(selectInfo.startTime);
  const [endTime, setEndTime] = useState<string>(selectInfo.endTime);
  const [editorBody, setEditorBody] = useState<string>(selectInfo.body);

  const removeSchedule = useConfirm(
    "일정을 삭제 하시겠습니까?",
    () => handleDelete(selectInfo.id),
    () => null
  );

  const handleSubmit = () => {
    const fixedEndDate = allDay
      ? moment(endDate).add(1, "days").format("YYYY-MM-DD")
      : endDate;
    const calAdd = {
      type: "ADD",
      title: title,
      allDay: allDay,
      start: `${startDate}T${startTime}:00`,
      end: `${fixedEndDate}T${endTime}:00`,
      body: editorBody,
      userId: userId,
    };

    const calUpdate = {
      type: "UPDATE",
      id: selectInfo.id,
      title: title,
      allDay: allDay,
      start: `${startDate}T${startTime}:00`,
      end: `${fixedEndDate}T${endTime}:00`,
      body: editorBody,
      userId: userId,
    };

    if (modalType === "ADD") {
      submit(calAdd);
    }
    if (modalType === "UPDATE") {
      submit(calUpdate);
    }
  };

  const getInputStringLength = (value: string) => {
    let inputLength = 0;

    for (let i = 0; i < value.length; i++) {
      let currentChar = value.charCodeAt(i);
      inputLength += currentChar >> 7 ? 2 : 1.1;
    }
    return inputLength;
  };

  const inputValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    const inputLength = getInputStringLength(e.target.value);
    if (inputLength > 52) {
      setTitle(e.target.value.slice(0, e.target.value.length - 1));
    }
  };

  return (
    <div
      className={[
        style.wrapper,
        modeInfo === "light"
          ? style_mode.blur_background_light
          : style_mode.blur_background_dark,
      ].join(" ")}
    >
      <div
        className={[
          style.popupWrapper,
          modeInfo === "light"
            ? style_mode.popup_wrapper_light
            : style_mode.popup_wrapper_dark,
        ].join(" ")}
      >
        <div className={style.popup}>
          <div className={style.titleDiv}>
            <input
              type="text"
              name="title"
              className="titleInput"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={inputValueHandler}
              autoFocus
            />
          </div>
          <div className={style.timeSetDiv}>
            <div className={style.checkboxDiv}>
              <FormControlLabel
                control={
                  <Checkbox
                    className={style.checkbox}
                    checked={allDay}
                    onChange={(e: any) => setAllDay(e.target.checked)}
                    name="allDay"
                  />
                }
                label="종일"
                labelPlacement="start"
                className={style.dayLabel}
              />
            </div>
            <div className={style.selectDiv}>
              <form className={style.container} noValidate>
                <TextField
                  className={style.fromDateSelector}
                  id="fromDate"
                  label=""
                  type="date"
                  defaultValue={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </form>
              {allDay ? null : (
                <form className={style.container} noValidate>
                  <TextField
                    className={style.fromTimeSelector}
                    id="fromTime"
                    label=""
                    type="time"
                    defaultValue={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
                </form>
              )}
              <p className={style.dash}>&#8212;</p>
              <form className={style.container} noValidate>
                <TextField
                  className={style.toDateSelector}
                  id="toDate"
                  label=""
                  type="date"
                  defaultValue={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </form>
              {allDay ? null : (
                <form className={style.container} noValidate>
                  <TextField
                    className={style.toTimeSelector}
                    id="toTime"
                    label=""
                    type="time"
                    defaultValue={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
                </form>
              )}
            </div>
          </div>
          <div
            className={[
              style.noteDiv,
              modeInfo === "light"
                ? style_mode.noteDiv_light
                : style_mode.noteDiv_dark,
            ].join(" ")}
          >
            <div className={style.modal_editor}>
              <RMDEditor
                id="example"
                readOnly={false}
                readOnlyWriteCheckboxes
                // value={}
                placeholder={"일정에 대한 메모를 적어보세요.."}
                defaultValue={selectInfo.body}
                scrollTo={window.location.hash}
                handleDOMEvents={
                  {
                    // focus: () => console.log("FOCUS"),
                    // blur: () => console.log("BLUR"),
                    // paste: () => console.log("PASTE"),
                    // touchstart: () => console.log("TOUCH START"),
                  }
                }
                onSave={(options) => console.log("Save triggered", options)}
                onCancel={() => console.log("Cancel triggered")}
                onChange={(value) => setEditorBody(value)}
                onClickLink={(href, event) =>
                  console.log("Clicked link: ", href, event)
                }
                onHoverLink={(event: any) => {
                  console.log("Hovered link: ", event.target.href);
                  return false;
                }}
                onClickHashtag={(tag, event) =>
                  console.log("Clicked hashtag: ", tag, event)
                }
                onCreateLink={(title) => {
                  // Delay to simulate time taken for remote API request to complete
                  return new Promise((resolve, reject) => {
                    setTimeout(() => {
                      if (title !== "error") {
                        return resolve(
                          `/doc/${encodeURIComponent(title.toLowerCase())}`
                        );
                      } else {
                        reject("500 error");
                      }
                    }, 1500);
                  });
                }}
                onShowToast={(message, type) =>
                  window.alert(`${type}: ${message}`)
                }
                dark={modeInfo === "light" ? false : true}
              />
            </div>
          </div>
          <div className={style.btnDiv}>
            <button className={style.submit_button} onClick={handleSubmit}>
              {modalType === "ADD" ? "추가" : "수정"}
            </button>
            {modalType === "UPDATE" ? (
              <button className={style.remove_button} onClick={removeSchedule}>
                삭제
              </button>
            ) : null}
            <button className={style.cancel_button} onClick={toggleModal}>
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
