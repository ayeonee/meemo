import React, { useState, useEffect } from "react";
import useConfirm from "../../../hooks/useConfirm";
import { useTodoState, useTodoDispatch } from "../TodosContext";

import style from "./TodoHeader.module.scss";

function TodoHeader() {
  const todos = useTodoState();
  const dispatch = useTodoDispatch();
  const [checkedTodo, setCheckedTodo] = useState(todos);

  const resetTodo = () => {
    dispatch({ type: "RESET" });
  };

  const onClickReset = useConfirm(
    "To-Do List를 초기화 하시겠습니까?",
    resetTodo,
    () => null
  );

  useEffect(() => {
    setCheckedTodo(todos.filter((elem) => elem.checked));
  }, [todos]);

  return (
    <div className={style.todo_header_wrapper}>
      <div className={style.todo_header_front}>
        <h1 className={style.todo_title}>To-Do List</h1>
        <div className={style.todo_count}>
          {checkedTodo.length}/{todos.length} Tasks Done!
        </div>
      </div>
      <div onClick={onClickReset} className={style.todo_reset}>
        초기화
      </div>
    </div>
  );
}

export default TodoHeader;
