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
  useEffect(() => {
    const listener = (event: any) => {
      if (event.which === 13) {
        props.delete(props.selectedId);
      }
      if (event.which === 27) {
        props.toggleDelModal();
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
            <p id={`noDeselect`}>지우기</p>
          </div>
          <div className={style.targetDiv} id={`noDeselect`}>
            {props.type === "notelist" ? (
              <p>
                <b>{`${props.selectedTitle}`}</b> 이(가) 삭제됩니다
              </p>
            ) : (
              <>
                <p>
                  <b>{`${props.selectedTitle}`}</b> 와{" "}
                  <b>{`${props.childTitles.length}`}</b> 개의 노트들이
                  삭제됩니다
                </p>
                <div className={style.childTitleDiv}>
                  {props.childTitles.map((title: string, i: number) => (
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
              onClick={() => props.delete(props.selectedId)}
            >
              지우기
            </button>
            <button
              name="cancelBtn"
              id={`noDeselect`}
              onClick={props.toggleDelModal}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
