import { useContext, useState } from 'react';
import { ITodos, IContext, ICreate } from '../../interfaces/interfaces';
import { TodosContext } from '../ListForm';

interface ITask {
  task: ITodos;
}

function Task({task}: ITask) {
  const [edit, setEdit] = useState(false)
  const [value, setValue] = useState(task.title);  
  const {onRemoveTodos, onToggleTodos, onEdit}: IContext = useContext(TodosContext)
  const {title, completed, id, tags} = task;

  const changeParams: ICreate = {
    title: value,
    tags: tags
  }

  const keyPressHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  const getTagsFromTitle = (string: string) => {
    const array: string[] = string.split(' ')
    const tagsArray = array.filter((str: string) => str.includes('#'))
    return tagsArray.map((tag: string) => {
      if(tag.split('#').length === 1){
        return tag[0];
      } else {
        return tag.split('#')
      }
    }).flat();
  }

  const complitedHandler = () => {
    onToggleTodos(id)
  }
  const removedHandler = () => {
    onRemoveTodos(id)
  }

  const editTodos = () =>{
    setEdit(prev => !prev)
  }

  const saveEdit = () => {
    setEdit(prev => !prev)
    changeParams.tags = getTagsFromTitle(changeParams.title)
    onEdit(id, changeParams)
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
      <p className={completed?'complited':''}>{title}</p>
      :
      <input
        autoFocus
        value={value}
        onChange={keyPressHandler}
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