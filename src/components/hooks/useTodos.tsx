import { useState, useEffect, useMemo } from 'react';
import { ICreate, ITodos } from '../../interfaces/interfaces';

const useTodos = (storage: ITodos[], tag: string) => {
  const [todos, setTodos] = useState(storage);
  const [createTodo, setCreateTodo] = useState({} as ICreate);

  useEffect(()=>{
    if(storage){
      setTodos(storage);
    }
  }, [])


  const todosList = useMemo(()=>{
    if(!tag || tag === 'all'){
      return [...todos]
    } else {
      return [...todos].filter((todo: ITodos) => {if(todo.title.includes(tag)){
        return todo;
      }});
    }
  }, [tag, todos]);

  const addTodoToList = () => {
    if(createTodo.title){
      const todo: ITodos = {
        id: Date.now(),
        title: createTodo.title,
        completed: false,
        tags: createTodo.tags
      }
      setTodos([...todosList, todo])
      setCreateTodo({} as ICreate)
    }
  }

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])

  useEffect(()=>{
  addTodoToList();
  }, [createTodo])

  return {todosList, setCreateTodo, setTodos}
}

export default useTodos