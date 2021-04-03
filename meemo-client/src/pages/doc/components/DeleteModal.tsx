import { StylesProvider } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import { getGeneratedNameForNode } from "typescript";
import style from "../styles/DeleteModal.module.scss";

type DeleteModalProps = {
  type: string;
  childTitles: Array<string>;
  selectedTitle: string;
  selectedId: string;
  delete: (id: string) => void;
  toggleDelModal: () => void;
};

export default function DeleteModal(props: DeleteModalProps): JSX.Element {
  const {
    type,
    childTitles,
    selectedTitle,
    selectedId,
    toggleDelModal,
  } = props;
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
            <p id={`noDeselect`}>지우기</p>
          </div>
          <div className={style.targetDiv} id={`noDeselect`}>
            {type === "notelist" ? (
              <p>
                <b>{`${selectedTitle}`}</b> 이(가) 삭제됩니다
              </p>
            ) : (
              <>
                <p>
                  <b>{`${selectedTitle}`}</b> 와{" "}
                  <b>{`${childTitles.length}`}</b> 개의 노트들이 삭제됩니다
                </p>
                <div className={style.childTitleDiv}>
                  {childTitles.map((title: string, i: number) => (
                    <b key={i}>{`${title}`}</b>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className={style.btnDiv} id={`noDeselect`}>
            <button
              className="submitBtn"
              id={`noDeselect`}
              onClick={() => props.delete(selectedId)}
            >
              지우기
            </button>
            <button name="cancelBtn" id={`noDeselect`} onClick={toggleDelModal}>
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
