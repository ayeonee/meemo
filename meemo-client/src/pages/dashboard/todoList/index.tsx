import style from "../DashBoard.module.scss";

function TodoList(): JSX.Element {
  return (
    <div className={style.todo_list}>
      <div className={style.title}>To Do List</div>
    </div>
  );
}

export default TodoList;
