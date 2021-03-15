import React from "react";
import TodoHeader from "./TodoHeader";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { TodoContextProvider } from "./TodosContext";
import style from "./TodoPage.module.scss";

function TodoPage() {
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

export default TodoPage;
