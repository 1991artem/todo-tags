import { createContext, useEffect, useState } from "react";
import Input from "./Input/Input";
import List from "./List/List";
import { IContext, ITodos } from '../interfaces/interfaces';

export const TodosContext = createContext({} as IContext);

export function ListForm() {
  const [todos, setTodos] = useState([] as ITodos[]);
  const [todoTitle, setTodoTitle] = useState('')

  const getTags = (title: string): string[] => {
    const tagsArray: string[] = title.split(' ');
    const fiterTagArray =  tagsArray.filter((item:string) => {
      if(item.includes('#')){
        return item;
      } else return null
    })
    return fiterTagArray.map((item:string) =>{
      const tag =  item.split('#');
      return tag.length === 1? `#${tag[0]}`:`#${tag[1]}`
    })
  }

  const addTodoToList = (title: string) => {
    if(title){
      const todo: ITodos = {
        id: todos.length,
        title: title,
        completed: false,
        tags: getTags(title)
      }
      setTodos([...todos, todo])
      setTodoTitle('')
    }
  }
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>addTodoToList(todoTitle), [todoTitle])


  return (
    < TodosContext.Provider value={context}>
        <div className="list">
      <Input setTodoTitle={setTodoTitle}/>
      <List todos={todos} />
    </div>
    </TodosContext.Provider>
    );
}
