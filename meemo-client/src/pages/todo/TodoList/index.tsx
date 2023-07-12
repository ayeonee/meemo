import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import axios from "axios";
import { useTodoState } from "../TodosContext";
import { useTodoDispatch } from "../TodosContext";
import { Todo } from "../../../_types/todo";
import style from "../styles/TodoList.module.scss";
import { BASE_URL } from "../../../constants/url";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";

function TodoList(): JSX.Element {
  const todos = useTodoState();
  const dispatch = useTodoDispatch();
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const userIdInfo = useSelector(
    (state: RootState) => state.userReducer.userData.userId
  );

  const getTodo = async (userId: string | null) => {
    await axios({
      method: "POST",
      baseURL: BASE_URL,
      url: "/get/todo",
      data: {
        userId: userId,
      },
    })
      .then((res) => setTodoList(res.data.payload))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getTodo(userIdInfo);
  }, []);

  useEffect(() => {
    dispatch({
      type: "MOUNT",
      todoData: todoList,
    });
  }, [todoList, dispatch]);

  return (
    <ul className={style.list_wrapper}>
      {todos.map((elem) => (
        <TodoItem todo={elem} key={elem.id} />
      ))}
    </ul>
  );
}

export default React.memo(TodoList);
