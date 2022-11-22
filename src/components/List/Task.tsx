import { ChangeEvent, KeyboardEvent, useContext, useState } from 'react';
import { ITodos, IContext, ICreate } from '../../interfaces/interfaces';
import useInput from '../hooks/useInput';
import { TodosContext } from '../ListForm';
import Tags from './Tags';
import addTags from '../helps/addTags';

interface ITask {
  task: ITodos;
}

function Task({task}: ITask) {
  const [edit, setEdit] = useState(false)
  const {tags, setValue, title} = useInput(task.title)
  const [string, setString] = useState(addTags(title, task.tags))
  const {onRemoveTodos, onToggleTodos, onEdit}: IContext = useContext(TodosContext)
  const {completed, id} = task;

  const changeParams: ICreate = {
    title,
    tags
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setString(e.target.value);
    setValue(e.target.value)
  }

  const keyPressHandler = (event: KeyboardEvent) => {
    if(event.key === 'Enter'){
      saveEdit()
    }
  }

  const complitedHandler = () => {
    onToggleTodos(id)
  }
  const removedHandler = () => {
    onRemoveTodos(id)
  }

  const editTodos = () =>{
    setValue(string)
    setEdit(prev => !prev)
  }

  const saveEdit = () => {
    onEdit(id, changeParams)
    setEdit(prev => !prev)
  }


  return ( 
    <div className="task">
      <span
        onClick={complitedHandler}
      >
      {
        completed ?
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path d="M 18 32.34 l -8.34 -8.34 -2.83 2.83 11.17 11.17 24 -24 -2.83 -2.83 z" 
        stroke="#3da35a" fill="#3da35a"/>
        </svg>
        :
        ''
      }
    </span>
    {
      !edit ? 
      <div>
      <p className={completed?'complited':''}>{title}</p>
      <Tags tags={task.tags} setTag={()=>{}} tag={''}/>
      </div>

      :
      <input
        autoFocus
        value={string}
        onChange={onChangeHandler}
        onKeyPress={keyPressHandler}
      />
    }
      
      <div>
      <button onClick={removedHandler}>&#10060;</button>
      {
        edit?
        <button onClick={saveEdit}>&#127383;</button>
        :
        <button onClick={editTodos}>&#128394;</button>
      }
      
      </div>
    </div>
    );
}

export default Task;