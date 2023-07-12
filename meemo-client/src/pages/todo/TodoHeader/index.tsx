import { useState, useEffect } from "react";
import useConfirm from "../../../hooks/useConfirm";
import { useTodoState, useTodoDispatch } from "../TodosContext";
import reset from "../../../img/reset-icon.svg";
import resetDark from "../../../img/reset-icon_dark.svg";
import style from "../styles/TodoHeader.module.scss";
import style_mode from "../styles/modeColor.module.scss";
import { Mode } from "../../../_types/modeTypes";

export default function TodoHeader({ modeInfo }: Mode): JSX.Element {
  const todos = useTodoState();
  const dispatch = useTodoDispatch();
  const [checkedTodo, setCheckedTodo] = useState(todos);

  const resetTodo = () => {
    dispatch({ type: "RESET" });
  };

  const onClickReset = useConfirm(
    "To-Do List를 초기화 하시겠습니까?",
    resetTodo
  );

  useEffect(() => {
    setCheckedTodo(todos.filter((elem) => elem.checked));
  }, [todos]);

  return (
    <div
      className={[
        style.todo_header_wrapper,
        modeInfo === "light"
          ? style_mode.todo_header_wrapper_light
          : style_mode.todo_header_wrapper_dark,
      ].join(" ")}
    >
      <div className={style.todo_header_front}>
        <h1 className={style.todo_title}>To-Do List</h1>
        <div className={style.todo_count}>
          {checkedTodo.length}/{todos.length} Tasks Done!
        </div>
      </div>
      <div className={style.reset_wrapper} onClick={onClickReset}>
        <img
          src={modeInfo === "light" ? `${reset}` : `${resetDark}`}
          alt="reset icon"
        />
        <div className={style.todo_reset}>초기화</div>
      </div>
    </div>
  );
}
