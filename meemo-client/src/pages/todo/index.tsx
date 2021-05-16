import TodoHeader from "./TodoHeader";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { TodoContextProvider } from "./TodosContext";
import { useSelector } from "react-redux";
import { RootState } from "../../_reducers";
import style from "./styles/TodoPage.module.scss";

export default function TodoPage(): JSX.Element {
  const modeInfo = useSelector((state: RootState) => state.modeReducer.mode);

  return (
    <TodoContextProvider>
      <div className={style.todo_page_wrapper}>
        <div className={style.todo_page}>
          <TodoHeader modeInfo={modeInfo} />
          <TodoInput modeInfo={modeInfo} />
          <TodoList />
        </div>
      </div>
    </TodoContextProvider>
  );
}
