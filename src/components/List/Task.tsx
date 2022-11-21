import { useContext } from 'react';
import { ITodos, IContext } from '../../interfaces/interfaces';
import { TodosContext } from '../ListForm';

interface ITask {
  task: ITodos;
}

function Task({task}: ITask) {
  const {onRemove, onToggle}: IContext = useContext(TodosContext)
  const {title, completed, id} = task;
  const complitedHandler = () => {
    onToggle(id)
  }
  const removedHandler = () => {
    onRemove(id)
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
      <p className={completed?'complited':''}>{title}</p>
      <button onClick={removedHandler}>&#10060;</button>
    </div>
   );
}

export default Task;