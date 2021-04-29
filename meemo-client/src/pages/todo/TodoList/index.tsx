import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import axios from "axios";
import { useTodoState } from "../TodosContext";
import { useTodoDispatch } from "../TodosContext";
import { Todo } from "../../../_types/todoTypes";
import style from "./TodoList.module.scss";

function TodoList(): JSX.Element {
  const todos = useTodoState();
  const dispatch = useTodoDispatch();
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const BASE_URL = "https://meemo.kr/api";
  // const BASE_URL = "http://localhost:5000/api";
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
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getTodo(localStorage.getItem("meemo-user-id"));
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
