import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import style from "../styles/TodoList.module.scss";
import axios from "axios";
import AchievementRate from "./achievementRate";
import { Todo } from "../../../_types/todoTypes";
import { UserIdType } from "../../../_types/authTypes";
import { BASE_URL } from "../../../_data/urlData";

function TodoList({ userIdInfo }: UserIdType): JSX.Element {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [checkedTodo, setCheckedTodo] = useState<
    {
      checked: boolean;
    }[]
  >([]);
  const history = useHistory();
  let count: number = 0; //todolist max값 위해

  const goTodoPage = () => {
    history.push({
      pathname: `/todo`,
    });
  };

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
    todoList.map((item) => {
      if (item.checked) {
        setCheckedTodo((checkedTodo) => [
          ...checkedTodo,
          {
            checked: item.checked,
          },
        ]);
      } else {
      }
    });
  }, [todoList]);

  useEffect(() => {
    getTodo(userIdInfo);

    return setTodoList([]);
  }, []);

  return (
    <div className={style.todo_list}>
      <div className={style.title}>TO-DO LIST</div>
      <div className={style.sub_title}>
        <span>해야 할 일을 등록하고 달성해보세요!</span>
      </div>
      <div className={style.todo_wrapper}>
        <AchievementRate todoList={todoList} checkedTodo={checkedTodo} />
        <div className={style.todo_box}>
          <div className={style.todo_container}>
            {todoList.length !== 0 && checkedTodo.length === todoList.length ? (
              <div className={style.null_message} aria-label="celebrate icon">
                🎉 &nbsp; 100% 달성 완료! &nbsp; 🎉
              </div>
            ) : (
              <>
                {todoList === null || todoList.length === 0 ? (
                  <div className={style.todo_info}>
                    <div className={style.todo_div}>
                      <div className={style.todo_text}>
                        할일을 등록해 보세요!
                      </div>
                    </div>
                  </div>
                ) : (
                  todoList.map((item) => {
                    if (!item.checked && count < 3) {
                      count++;
                      return (
                        <div key={item.id} className={style.todo_info}>
                          <div className={style.todo_div}>
                            <div className={style.todo_text}>
                              {item.schedule}
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })
                )}
              </>
            )}
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
