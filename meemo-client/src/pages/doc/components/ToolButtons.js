import React from "react";
import * as Styled from "../styles/btnStyled";

import { useEditUpdate, useDarkUpdate } from "../contexts/ToolContext";

//
export default function ToolButtons(props) {
  const setEdit = useEditUpdate();
  const setDark = useDarkUpdate();
  return (
    <div>
      {props.screen === "list" ? (
        <Styled.DarkButton onClick={setDark}>Dark</Styled.DarkButton>
      ) : (
        <>
          <Styled.EditButton onClick={setEdit}>Edit</Styled.EditButton>
          <Styled.DarkButton onClick={setDark}>Dark</Styled.DarkButton>
        </>
      )}
    </div>
  );
}
