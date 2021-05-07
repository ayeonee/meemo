import { useState, useEffect } from "react";
import style from "../styles/AddRenameModal.module.scss";

type PopupToggleProps = {
  prevTitle: string;
  selectedId: string;
  component: string;
  togglePopup: () => void;
  getTitle: (t: string) => void;
  getRename: (id: string, t: string) => void;
};

export default function AddRenameModal(props: PopupToggleProps) {
  const {
    prevTitle,
    selectedId,
    component,
    togglePopup,
    getTitle,
    getRename,
  } = props;

  const setType = () => {
    if (component === "notelist") {
      return "노트 생성";
    } else if (component === "folderlist") {
      return "폴더 생성";
    } else if (component === "rename") {
      return "이름 변경";
    }
  };

  const btnLabel = component === "rename" ? "변경" : "생성";

  const [inputVal, setInputVal] = useState(
    component === "rename" ? prevTitle : `${setType()}`
  );

  const handleSubmit = (val: string, id: string) => {
    component === "rename" ? getRename(id, val) : getTitle(val);
  };

  // tried to link keyboard keys such as Enter and ESC to the onClicks;
  useEffect(() => {
    const listener = (event: any) => {
      if (event.which === 13) {
        handleSubmit(inputVal, selectedId);
      }
      if (event.which === 27) {
        props.togglePopup();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });

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
              className={style.submit_button}
              id={`noDeselect`}
              onClick={() => handleSubmit(inputVal, selectedId)}
            >
              {btnLabel}
            </button>
            <button
              name="cancelBtn"
              id={`noDeselect`}
              onClick={togglePopup}
              className={style.cancel_button}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
