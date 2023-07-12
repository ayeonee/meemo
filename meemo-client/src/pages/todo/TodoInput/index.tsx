import React, { useCallback, useState } from "react";
import { useTodoDispatch } from "../TodosContext";
import style from "../styles/InputTodo.module.scss";
import style_mode from "../styles/modeColor.module.scss";
import { Mode } from "../../../_types/mode";

export default function InputTodo({ modeInfo }: Mode): JSX.Element {
  const [input, setInput] = useState<string>("");
  const dispatch = useTodoDispatch();

  const onChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    },
    []
  );

  const addTodoData = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!input || !/\S/.exec(input)) {
        alert("내용을 입력해주세요.");
      } else {
        dispatch({
          type: "CREATE",
          schedule: input,
        });
      }
      setInput("");
    },
    [input, dispatch]
  );

  return (
    <form className={style.todo_input_wrapper} onSubmit={addTodoData}>
      <input
        className={[
          style.todo_input,
          modeInfo === "light"
            ? style_mode.todo_input_light
            : style_mode.todo_input_dark,
        ].join(" ")}
        type="text"
        value={input}
        onChange={onChangeInput}
      />
      <button
        className={[
          style.todo_input_button,
          modeInfo === "light"
            ? style_mode.todo_input_button_light
            : style_mode.todo_input_button_dark,
        ].join(" ")}
      >
        +
      </button>
    </form>
  );
}
