import style from "../../styles/TodoList.module.scss";
import { useState, useEffect } from "react";
import { Todo } from "../../../../_types/todoTypes";
import { Pie } from "react-chartjs-2"; //chart 위한 라이브러리

interface AchievementRateProps {
  todoList: Todo[];
}

function AchievementRate({ todoList }: AchievementRateProps): JSX.Element {
  const [checkedTodo, setCheckedTodo] = useState<
    {
      checked: boolean;
    }[]
  >([]);

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

  return (
    <div className={style.graph_box}>
      {todoList.length === 0 ? (
        <div className={style.none_circle}></div>
      ) : (
        <div className={style.graph_container}>
          <div className={style.rate_circle}>
            <h1>{`${Math.round(
              (checkedTodo.length / todoList.length) * 100
            )}%`}</h1>
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
