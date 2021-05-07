import { useState, useEffect } from "react";
import style from "../styles/CalendarModal.module.scss";
import RMDEditor from "rich-markdown-editor";
import debounce from "lodash/debounce";

import DeleteModal from "./DeleteModal";

// import {
//   EventApi,
//   DateSelectArg,
//   EventClickArg,
//   EventContentArg,
//   formatDate,
//   EventInput,
// } from "@fullcalendar/react";

import moment from "moment";

import { Checkbox, FormControlLabel } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { update } from "lodash";

interface CalendarModalProps {
  modalType: string;
  toggleModal: () => void;
  selectInfo: any;
  submit: (evnt: object) => void;
  handleDelete: (id: string) => void;
}

// type selectInfoType = {
//   startStr: string;
//   endStr: string;
// };

export default function CalendarModal(props: CalendarModalProps): JSX.Element {
  const { modalType, toggleModal, selectInfo, submit, handleDelete } = props;

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

  const [showDelModal, setShowDelModal] = useState<boolean>(false);

  useEffect(() => {
    // console.log(editorBody);
  }, []);

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
    };

    const calUpdate = {
      type: "UPDATE",
      id: selectInfo.id,
      title: title,
      allDay: allDay,
      start: `${startDate}T${startTime}:00`,
      end: `${fixedEndDate}T${endTime}:00`,
      body: editorBody,
    };

    if (modalType === "ADD") {
      submit(calAdd);
    }
    if (modalType === "UPDATE") {
      submit(calUpdate);
    }
  };

  useEffect(() => {
    if (showDelModal === false) {
      const listener = (event: any) => {
        if (event.which === 13) {
          handleSubmit();
        }
        if (event.which === 27) {
          toggleModal();
        }
      };
      document.addEventListener("keydown", listener);
      return () => {
        document.removeEventListener("keydown", listener);
      };
    }
  });

  return (
    <div className={style.wrapper}>
      <div className={style.popupWrapper}>
        <div className={style.popup}>
          <div className={style.titleDiv}>
            <input
              type="text"
              name="title"
              className="titleInput"
              placeholder="제목을 입력하세요"
              maxLength={26}
              value={title}
              onChange={(e: any) => setTitle(e.target.value)}
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
              <p>&#8212;</p>
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
          <div className={style.noteDiv}>
            <RMDEditor
              id="example"
              readOnly={false}
              readOnlyWriteCheckboxes
              // value={}
              placeholder={"일정에 대한 메모를 적어보세요..."}
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
              dark={false}
            />
          </div>
          <div className={style.btnDiv}>
            <button className={style.submit_button} onClick={handleSubmit}>
              {modalType === "ADD" ? "추가" : "수정"}
            </button>
            <button className="cancelBtn" onClick={toggleModal}>
              취소
            </button>
            {modalType === "UPDATE" ? (
              <button
                className="deleteBtn"
                onClick={() => setShowDelModal(!showDelModal)}
              >
                삭제
              </button>
            ) : null}
          </div>
        </div>
      </div>
      {showDelModal ? (
        <DeleteModal
          toggleModal={() => setShowDelModal(!showDelModal)}
          handleDelete={() => handleDelete(selectInfo.id)}
        />
      ) : null}
    </div>
  );
}
