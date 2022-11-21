import { createContext, useEffect, useState } from "react";
import Input from "./Input/Input";
import List from "./List/List";
import { IContext, ITodos } from '../interfaces/interfaces';
import useTodos from "./hooks/useTodos";
import Tags from "./List/Tags";

interface IListForm {
  storage: ITodos[] | [];
}

export const TodosContext = createContext({} as IContext);

export function ListForm({storage}: IListForm) {
  const {todosList, tagsArray, setTodos, setTodoTitle, setTag} = useTodos(storage);

  const toggleHandler = (id: number) => {
    setTodos(prev =>
      prev.map((todo: ITodos) => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    )
  }

  const removeHandler = (id: number) => {
      setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const context: IContext = {
    onToggle: toggleHandler,
    onRemove: removeHandler,
  }

  return (
    < TodosContext.Provider value={context}>
      <div className="list">
        <Input setTodoTitle={setTodoTitle}/>
        <List todos={todosList} />
        <Tags tags={tagsArray} setTag={setTag}/>
      </div>
    </TodosContext.Provider>
    );
}
