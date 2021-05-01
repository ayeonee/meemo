import TodoHeader from "./TodoHeader";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { TodoContextProvider } from "./TodosContext";
import style from "./styles/TodoPage.module.scss";

export default function TodoPage(): JSX.Element {
  return (
    <TodoContextProvider>
      <div className={style.todo_page_wrapper}>
        <div className={style.todo_page}>
          <TodoHeader />
          <TodoInput />
          <TodoList />
        </div>
      </div>
    </TodoContextProvider>
  );
}
