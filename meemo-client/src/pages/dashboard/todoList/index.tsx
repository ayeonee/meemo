import { useState, useEffect } from "react";
import style from "../DashBoard.module.scss";
import axios from "axios";
import { BASE_URL } from "../../../_data/urlData";

type Todo = {
  id: number;
  schedule: string;
  checked: boolean;
};

function TodoList(): JSX.Element {
  const [todo, setTodo] = useState<Todo[]>([]);

  // const getTodo = async (userId: string | null) => {
  //   await axios({
  //     method: "POST",
  //     url: "/get/todo",
  //     data: {
  //       userId: userId,
  //     },
  //   })
  //     .then((res) => setTodo(res.data.payload))
  //     .catch((err) => console.log(err));
  // };

  // useEffect(() => {
  //   getTodo(localStorage.getItem("meemo-user-id"));
  // }, []);

  //console.log(todo);

  return (
    <div className={style.todo_list}>
      <div className={style.title}>To Do List</div>
    </div>
  );
}

export default TodoList;
