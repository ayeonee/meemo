import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import style from "../styles/TodoList.module.scss";
import axios from "axios";
import AchievementRate from "./achievementRate";
import { Todo } from "../../../_types/todoTypes";
import { BASE_URL } from "../../../_data/urlData";

function TodoList(): JSX.Element {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const history = useHistory();

  const getTodo = async (userId: string | null) => {
    await axios({
      method: "POST",
      baseURL: BASE_URL,
      url: "/get/todo",
      data: {
        userId: userId,
      },
    })
      .then((res) => {
        setTodoList(res.data.payload);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getTodo(localStorage.getItem("meemo-user-id"));
  }, []);

  const goTodoPage = () => {
    history.push({
      pathname: `/todo`,
    });
  };

  let count: number = 0; //todolist max값 위해

  return (
    <div className={style.todo_list}>
      <div className={style.title}>TO-DO LIST</div>
      <div className={style.todo_wrapper}>
        <AchievementRate todoList={todoList} />
        <div className={style.todo_box}>
          <div className={style.todo_container}>
            {todoList === null || todoList.length === 0
              ? "해야할 일이 없습니다."
              : todoList.map((item) => {
                  if (!item.checked && count < 3) {
                    count++;
                    return (
                      <div key={item.id} className={style.todo_info}>
                        <div className={style.todo_div}>
                          <div className={style.todo_text}>{item.schedule}</div>
                        </div>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
          </div>
          <div className={style.see_detail} onClick={() => goTodoPage()}>
            자세히 보기
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
