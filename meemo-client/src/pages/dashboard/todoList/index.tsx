import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import style from "../styles/TodoList.module.scss";
import style_mode from "../styles/modeColor.module.scss";
import axios from "axios";
import AchievementRate from "./achievementRate";
import { Todo } from "../../../_types/todoTypes";
import { UserIdType } from "../../../_types/authTypes";
import { Mode } from "../../../_types/modeTypes";
import { BASE_URL } from "../../../_data/urlData";

function TodoList({ userIdInfo, modeInfo }: UserIdType & Mode): JSX.Element {
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
    <div
      className={[
        style.todo_list,
        modeInfo === "light"
          ? style_mode.todo_list_light
          : style_mode.todo_list_dark,
      ].join(" ")}
    >
      <div className={style.title}>TO-DO LIST</div>
      <div className={style.sub_title}>
        <span>해야 할 일을 등록하고 달성해보세요!</span>
      </div>
      <div className={style.todo_wrapper}>
        <AchievementRate
          todoList={todoList}
          checkedTodo={checkedTodo}
          modeInfo={modeInfo}
        />
        <div className={style.todo_box}>
          <div
            className={[
              style.todo_container,
              modeInfo === "light"
                ? style_mode.todo_container_light
                : style_mode.todo_container_dark,
            ].join(" ")}
          >
            {todoList !== null &&
            todoList.length !== 0 &&
            checkedTodo.length === todoList.length ? (
              <h2 className={style.null_message} aria-label="celebrate icon">
                🎉 &nbsp; 100% 달성 완료! &nbsp; 🎉
              </h2>
            ) : (
              <>
                {todoList === null || todoList.length === 0 ? (
                  <div className={style.todo_info}>
                    <div className={style.todo_div}>
                      <div
                        className={[
                          style.todo_text,
                          modeInfo === "light"
                            ? style_mode.todo_text_light
                            : style_mode.todo_text_dark,
                        ].join(" ")}
                      >
                        할일을 등록해 보세요!
                      </div>
                    </div>
                  </div>
                ) : (
                  todoList.map((item) => {
                    if (!item.checked && count < 3) {
                      count++;
                      return (
                        <div
                          key={item.id}
                          className={[
                            style.todo_info,
                            modeInfo === "light"
                              ? style_mode.todo_info_light
                              : style_mode.todo_info_dark,
                          ].join(" ")}
                        >
                          <div className={style.todo_div}>
                            <div
                              className={[
                                style.todo_text,
                                modeInfo === "light"
                                  ? style_mode.todo_text_light
                                  : style_mode.todo_text_dark,
                              ].join(" ")}
                            >
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
