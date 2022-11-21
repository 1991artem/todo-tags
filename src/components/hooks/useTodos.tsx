import { useState, useEffect, useMemo } from 'react';
import { ITodos } from '../../interfaces/interfaces';
import useTags from './useTags';

const useTodos = (storage: ITodos[]) => {
  const [todos, setTodos] = useState(storage);
  const [todoTitle, setTodoTitle] = useState('');
  const {tagsArray, tag, defaultTags, getTags, setTag} = useTags(todos);

  useEffect(()=>{
    if(storage){
      setTodos(storage);
    }
  }, [])


  const todosList = useMemo(()=>{
    if(defaultTags.includes(tag)){
      return [...todos]
    } else {
      return [...todos].filter((todo: ITodos) => {if(todo.title.includes(tag)){
        return todo;
      }});
    }
  }, [tag, todos]);

  const addTodoToList = (title: string) => {
    if(title){
      const todo: ITodos = {
        id: Date.now(),
        title: title,
        completed: false,
        tags: getTags(title)
      }
      setTodos([...todosList, todo])
      setTodoTitle('')
    }
  }

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])

  useEffect(()=>{
  addTodoToList(todoTitle);
  }, [todoTitle])

  return {todosList, tagsArray, setTodoTitle, setTodos, setTag}
}

export default useTodos