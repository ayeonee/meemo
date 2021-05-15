import style from "../../styles/TodoList.module.scss";
import { Todo } from "../../../../_types/todoTypes";
import { Pie } from "react-chartjs-2"; //chart 위한 라이브러리

interface AchievementRateProps {
  todoList: Todo[];
  checkedTodo: {
    checked: boolean;
  }[];
}

function AchievementRate({
  todoList,
  checkedTodo,
}: AchievementRateProps): JSX.Element {
  //그래프에 넣을 데이터
  const todoBasedPieData = {
    datasets: [
      {
        data: [checkedTodo.length, todoList.length - checkedTodo.length],
        backgroundColor: ["#6cbea7", "rgb(210, 210, 210)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={style.graph_box}>
      <div className={style.graph_container}>
        <div className={style.block_circle}></div>
        <div className={style.rate_circle}>
          <h1>
            {todoList.length !== 0
              ? `${Math.round((checkedTodo.length / todoList.length) * 100)}%`
              : `0%`}
          </h1>
        </div>
        {todoList.length === 0 || todoList === null ? (
          <div className={style.none_circle}></div>
        ) : (
          <Pie type="pie" data={todoBasedPieData} className={style.pie} />
        )}
      </div>
    </div>
  );
}

export default AchievementRate;
