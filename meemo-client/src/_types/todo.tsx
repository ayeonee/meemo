export interface Todo {
  id: number;
  schedule: string;
  checked: boolean;
}

export type TodoState = Array<Todo>;
