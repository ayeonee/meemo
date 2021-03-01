import { useCallback, useState } from "react";
import { useTodoDispatch } from "../TodosContext";
import style from "./InputTodo.module.scss";

const InputTodo: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const dispatch = useTodoDispatch();

  const onChangeInput = useCallback((e: any) => {
    setInput(e.target.value);
  }, []);

  const addTodoData = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      dispatch({
        type: "CREATE",
        schedule: input,
      });
      setInput("");
    },
    [input, dispatch]
  );

  return (
    <form className={style.todo_input_wrapper} onSubmit={addTodoData}>
      <input
        className={style.todo_input}
        type="text"
        value={input}
        onChange={onChangeInput}
      />
      <button className={style.todo_input_button}>추가</button>
    </form>
  );
};

export default InputTodo;
