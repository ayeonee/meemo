import { useState, useCallback } from "react";
import { DataProps } from "../../../_types/scheduleTypes";
import InputBox from "./InputBox";
import { useSelector } from "react-redux";
import { RootState } from "../../../_reducers";
import style_mode from "../styles/modeColor.module.scss";
import style from "../styles/InputButtonStyle.module.scss";

export default function InputButton({
  addData,
  allData,
}: DataProps): JSX.Element {
  const modeInfo = useSelector((state: RootState) => state.modeReducer.mode);
  const [modalState, setModalState] = useState<boolean>(false);

  const openModal = () => {
    setModalState(true);
  };

  const closeModal = useCallback(() => {
    setModalState(false);
  }, []);

  return (
    <>
      <div
        onClick={openModal}
        className={[
          style.input_button,
          modeInfo === "light"
            ? style_mode.input_button_light
            : style_mode.input_button_dark,
        ].join(" ")}
      >
        <span> + </span>
      </div>
      <InputBox
        modalState={modalState}
        closeModal={closeModal}
        addData={addData}
        allData={allData}
      />
    </>
  );
}
