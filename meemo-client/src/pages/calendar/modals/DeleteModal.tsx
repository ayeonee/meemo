import { StylesProvider } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import { getGeneratedNameForNode } from "typescript";
import style from "../styles/DeleteModal.module.scss";

type DeleteModalProps = {
  handleDelete: () => void;
  toggleModal: () => void;
};

export default function DeleteModal(props: DeleteModalProps): JSX.Element {
  const { handleDelete, toggleModal } = props;
  useEffect(() => {
    const listener = (event: any) => {
      if (event.which === 13) {
        handleDelete();
      }
      if (event.which === 27) {
        toggleModal();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });

  return (
    <div className={style.wrapper}>
      <div className={style.popup}>
        <div className={style.innerPopup}>
          <div className={style.titleDiv}>
            <p>지우기</p>
          </div>
          <div className={style.targetDiv}>
            <p>해당 이벤트가 삭제됩니다</p>
          </div>
          <div className={style.btnDiv}>
            <button
              className={style.submit_button}
              onClick={() => handleDelete()}
            >
              지우기
            </button>
            <button name="cancelBtn" onClick={toggleModal}>
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
