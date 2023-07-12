import React, { useCallback } from "react";
import { useTodoDispatch } from "../TodosContext";
import { Todo } from "../../../_types/todo";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import style from "../styles/TodoList.module.scss";

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps): JSX.Element {
  const dispatch = useTodoDispatch();
  const modeInfo = useSelector((state: RootState) => state.modeReducer.mode);

  const onRemoveItem = useCallback(() => {
    dispatch({
      type: "REMOVE",
      id: todo.id,
    });
  }, []);

  const onToggle = useCallback(() => {
    dispatch({ type: "TOGGLE", id: todo.id });
  }, []);

  return (
    <li className={style.list}>
      <p
        className={
          todo.checked
            ? style.todo_true
            : [
                style.todo_false,
                modeInfo === "light"
                  ? style.todo_item_light
                  : style.todo_item_dark,
              ].join(" ")
        }
        onClick={onToggle}
      >
        {todo.schedule}
      </p>
      <p className={style.delete_todo} onClick={onRemoveItem}>
        &#215;
      </p>
    </li>
  );
}

export default React.memo(TodoItem);
