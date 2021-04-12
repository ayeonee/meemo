import { Dispatch, createContext, useReducer, useContext } from "react";
import { Todo } from "../../_types/todoTypes";

type Action =
  | { type: "CREATE"; schedule: string }
  | { type: "TOGGLE"; id: number }
  | { type: "RESET" }
  | { type: "REMOVE"; id: number };

type TodoState = Array<Todo>;
type TodoDispatch = Dispatch<Action>;

const TodoStateContext = createContext<TodoState | undefined>(undefined);
const TodoDispatchContext = createContext<TodoDispatch | undefined>(undefined);

const todoReducer = (state: TodoState, action: Action) => {
  switch (action.type) {
    case "CREATE":
      const nextId = Math.max(-1, ...state.map((elem) => elem.id)) + 1;
      return [
        ...state,
        { id: nextId, schedule: action.schedule, checked: false },
      ];

    case "REMOVE":
      return state.filter((elem) => elem.id !== action.id);

    case "TOGGLE":
      return state.map((elem) =>
        elem.id === action.id ? { ...elem, checked: !elem.checked } : elem
      );

    case "RESET":
      return [];

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
