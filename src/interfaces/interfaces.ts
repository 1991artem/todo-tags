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
}

export interface ICreate {
  title: string;
  tags: string[];
}