import { Dispatch, createContext, useReducer, useContext } from "react";
import axios from "axios";
import { Todo, TodoState } from "../../_types/todoTypes";
import { BASE_URL } from "../../_data/urlData";

const TodoStateContext = createContext<TodoState | undefined>(undefined);
const TodoDispatchContext = createContext<TodoDispatch | undefined>(undefined);

type Action =
  | { type: "CREATE"; schedule: string }
  | { type: "TOGGLE"; id: number }
  | { type: "RESET" }
  | { type: "REMOVE"; id: number }
  | { type: "MOUNT"; todoData: Todo[] };

type TodoDispatch = Dispatch<Action>;

const saveTodo = (payloadData: Todo[] | null) => {
  axios({
    method: "POST",
    baseURL: BASE_URL,
    url: "/save/todo",
    data: {
      userId: localStorage.getItem("meemo-user-id"),
      payload: payloadData,
    },
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const todoReducer = (state: TodoState, action: Action) => {
  switch (action.type) {
    case "CREATE":
      const nextId = Math.max(-1, ...state.map((elem) => elem.id)) + 1;
      const createArray = [
        ...state,
        { id: nextId, schedule: action.schedule, checked: false },
      ];

      saveTodo(createArray);
      return createArray;

    case "REMOVE":
      const removedArray = state.filter((elem) => elem.id !== action.id);

      saveTodo(removedArray);
      return removedArray;

    case "TOGGLE":
      const toggleArray = state.map((elem) =>
        elem.id === action.id ? { ...elem, checked: !elem.checked } : elem
      );

      saveTodo(toggleArray);
      return toggleArray;

    case "RESET":
      saveTodo(null);
      return [];

    case "MOUNT":
      return action.todoData;

    default:
      throw new Error("Unhandled action");
  }
};

export const TodoContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  return (
    <TodoDispatchContext.Provider value={dispatch}>
      <TodoStateContext.Provider value={todos}>
        {children}
      </TodoStateContext.Provider>
    </TodoDispatchContext.Provider>
  );
};

export const useTodoState = () => {
  const state = useContext(TodoStateContext);
  if (!state) throw new Error("TodosProvider not found");
  return state;
};

export const useTodoDispatch = () => {
  const dispatch = useContext(TodoDispatchContext);
  if (!dispatch) throw new Error("TodoDispatchContext not found");
  return dispatch;
};
