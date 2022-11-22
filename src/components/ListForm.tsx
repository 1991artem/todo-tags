import { createContext, useMemo, useState } from "react";
import Input from "./Input/Input";
import List from "./List/List";
import { IContext, ITodos, ICreate } from '../interfaces/interfaces';
import useTodos from "./hooks/useTodos";
import Tags from "./List/Tags";

interface IListForm {
  storage: ITodos[] | [];
}

export const TodosContext = createContext({} as IContext);

export function ListForm({storage}: IListForm) {
  const [tag, setTag] = useState('')
  const {todosList, setTodos, setCreateTodo} = useTodos(storage, tag);

  const tagsArray = useMemo(()=>{
    const allTags = todosList.map((todo: ITodos) => todo.tags)
    const tags = new Set(allTags.flat());
    return Array.from(tags)
  }, [todosList])

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
      setTodos(prev => prev.filter((todo: ITodos) => todo.id !== id))
  }

  const editTodos = (id: number, changeParams: ICreate) => {
    const todos = todosList.map((todo: ITodos) => {
      if(todo.id === id){
        return {...todo, ...changeParams}
      } else {
        return todo;
      }
    });
    console.log(todos)
    setTodos(todos)
}

  const context: IContext = {
    onToggleTodos: toggleHandler,
    onRemoveTodos: removeHandler,
    onEdit: editTodos,
  }

  console.log(todosList)

  return (
    < TodosContext.Provider value={context}>
      <div className="list">
        <Input createTodos={setCreateTodo} />
        <List todos={todosList} />
        <Tags tags={tagsArray} setTag={setTag}/>
      </div>
    </TodosContext.Provider>
    );
}
