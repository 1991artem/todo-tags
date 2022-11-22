import { createContext, useMemo, useState, useEffect } from 'react';
import Input from "./Input/Input";
import { IContext, ITodos, ICreate } from '../interfaces/interfaces';
import useTodos from "./hooks/useTodos";
import Tags from "./List/Tags";
import PaginationComponent from "./Pagination";
import AppRouter from "./Router";
import TagsClass from './helps/TagsClass';

interface IListForm {
  storage: ITodos[] | [];
}

export const TodosContext = createContext({} as IContext);

export function ListForm({storage}: IListForm) {
  const [tag, setTag] = useState('')
  const {todosList, setTodos, setCreateTodo} = useTodos(storage, tag);
  const itemInPage = 10;

  const tagsArray = useMemo(()=>{
    return TagsClass.madeTagsArray(todosList)
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
    setTodos(todos)
}

  const context: IContext = {
    onToggleTodos: toggleHandler,
    onRemoveTodos: removeHandler,
    onEdit: editTodos,
    limit: itemInPage
  }
  const count = Math.ceil(todosList.length/itemInPage)

  console.log(todosList)

  return (
    < TodosContext.Provider value={context}>
      <div className="list">
        <Input createTodos={setCreateTodo} />
        <AppRouter todos={todosList} />
        { todosList.length ?
          <Tags tags={tagsArray} setTag={setTag} tag={'all'}/>
          : null
        }
        <PaginationComponent count={count} />
      </div>
    </TodosContext.Provider>
    );
}
