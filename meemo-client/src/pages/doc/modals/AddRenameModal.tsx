import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../_reducers";
import style from "../styles/AddRenameModal.module.scss";
import style_mode from "../styles/modeColor.module.scss";

type PopupToggleProps = {
  prevTitle: string;
  selectedId: string;
  component: string;
  togglePopup: () => void;
  getTitle: (t: string) => void;
  getRename: (id: string, t: string) => void;
};

export default function AddRenameModal(props: PopupToggleProps) {
  const modeInfo = useSelector((state: RootState) => state.modeReducer.mode);
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

  const getInputStringLength = (value: string) => {
    let inputLength = 0;

    for (let i = 0; i < value.length; i++) {
      let currentChar = value.charCodeAt(i);
      inputLength += currentChar >> 7 ? 2 : 1.1;
    }
    return inputLength;
  };

  const inputValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
    const inputLength = getInputStringLength(e.target.value);
    if (inputLength > 36) {
      setInputVal(e.target.value.slice(0, e.target.value.length - 1));
    }
  };

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
    <div
      className={[
        style.wrapper,
        modeInfo === "light"
          ? style_mode.wrapper_light
          : style_mode.wrapper_dark,
      ].join(" ")}
      id={`noDeselect`}
    >
      <div
        className={[
          style.popup,
          modeInfo === "light" ? style_mode.popup_light : style_mode.popup_dark,
        ].join(" ")}
        id={`noDeselect`}
      >
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
              onChange={inputValueHandler}
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
