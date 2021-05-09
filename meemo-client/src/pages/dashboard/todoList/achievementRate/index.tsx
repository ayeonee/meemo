import { useState, useEffect } from "react";
import axios from "axios";
import style from "../../styles/TodoList.module.scss";
import { Todo } from "../../../../_types/todoTypes";
import { BASE_URL } from "../../../../_data/urlData";
import { Pie } from "react-chartjs-2"; //chart 위한 라이브러리

function AchievementRate(): JSX.Element {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const checkedTodo: Todo[] = [];

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
      .then((data) => {})
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getTodo(localStorage.getItem("meemo-user-id"));
  }, []);

  todoList.map((item) => {
    if (item.checked) {
      checkedTodo.push(item);
    } else {
    }
  });

  //그래프에 넣을 데이터
  const todoBasedPieData = {
    datasets: [
      {
        data: [checkedTodo.length, todoList.length - checkedTodo.length],
        backgroundColor: ["#6cbea7", "rgb(210, 210, 210)"],
        hoverBackGroundColor: ["#6cbea7", "rgb(210, 210, 210)"],
        borderWidth: 1,
      },
    ],
  };

  //그래프의 시각화를 돕는 options
  const todoPieOptions = {
    animation: false,
    plugins: {
      legend: {
        labels: {
          boxWidth: 10,
          font: {
            family:
              "'Noto Sans KR', '나눔고딕' , 'NanumGothic', BlinkMacSystemFont, -apple-system, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', sans-serif'",
          },
        },
      },
    },
  };

  return (
    <div className={style.graph_box}>
      {todoList.length === 0 ? (
        <div className={style.none_circle}></div>
      ) : (
        <div className={style.graph_container}>
          <div className={style.rate_circle}>
            <h1>{`${(checkedTodo.length / todoList.length) * 100}%`}</h1>
          </div>
          <Pie
            type="pie"
            data={todoBasedPieData}
            options={todoPieOptions}
            className={style.pie}
          />
          <div className={style.bg_circle}></div>
        </div>
      )}
    </div>
  );
}

export default AchievementRate;
