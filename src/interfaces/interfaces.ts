export interface ITodos {
  id: number;
  title: string;
  completed: boolean;
  tags: string[];
}

export interface IContext {
  onRemove: (id: number) => void;
  onToggle: (id: number) => void;
}