import { StylesProvider } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import { getGeneratedNameForNode } from "typescript";
import style from "../styles/Popup.module.scss";

interface toggle {
  prevTitle: string;
  selectedId: string;
  component: string;
  togglePopup: () => void;
  getTitle: (t: string) => void;
  getRename: (id: string, t: string) => void;
}

export default function Popup(props: toggle) {
  const setType = () => {
    if (props.component === "notelist") {
      return "새 노트";
    } else if (props.component === "folderlist") {
      return "새 폴더";
    } else if (props.component === "rename") {
      return "이름 바꾸기";
    }
  };

  const btnLabel = props.component === "rename" ? "바꾸기" : "만들기";

  const [inputVal, setInputVal] = useState(
    props.component === "rename" ? props.prevTitle : `${setType()}`
  );

  const handleSubmit = (val: string, id: string) => {
    props.component === "rename"
      ? props.getRename(id, val)
      : props.getTitle(val);
  };

  // tried to link keyboard keys such as Enter and ESC to the onClicks;

  // useEffect(() => {
  //   const listener = (event: any) => {
  //     if (event.code === "Enter" || event.code === "NumpadEnter") {
  //     }
  //   };
  //   document.addEventListener("keydown", listener);
  //   return () => {
  //     document.removeEventListener("keydown", listener);
  //   };
  // }, []);

  return (
    <div className={style.wrapper} id={`noDeselect`}>
      <div className={style.popup} id={`noDeselect`}>
        <div className={style.innerPopup} id={`noDeselect`}>
          <div className={style.titleDiv} id={`noDeselect`}>
            <p id={`noDeselect`}>{setType()}</p>
          </div>
          <div className={style.inputDiv} id={`noDeselect`}>
            <input
              type="text"
              name="folder_title"
              id={`noDeselect`}
              value={inputVal}
              onChange={(e: any) => setInputVal(e.target.value)}
              maxLength={16}
              autoFocus
            ></input>
          </div>
          <div className={style.btnDiv} id={`noDeselect`}>
            <button
              className="submitBtn"
              id={`noDeselect`}
              onClick={() => handleSubmit(inputVal, props.selectedId)}
            >
              {btnLabel}
            </button>
            <button
              name="cancelBtn"
              id={`noDeselect`}
              onClick={props.togglePopup}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
