export interface ITodos {
  id: number;
  title: string;
  completed: boolean;
  tags: string[];
}

export interface IContext {
  onRemoveTodos: (id: number) => void;
  onToggleTodos: (id: number) => void;
  onEdit: (id: number, changeParams: ICreate) => void;
  limit: number;
}

export interface ICreate {
  title: string;
  tags: string[];
}

export interface ITransferTodos {
  todos: ITodos[];
}