import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { ITodos, ITransferTodos } from "../../interfaces/interfaces";
import '../styles/task.scss';
import Task from "./Task";
import { useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { TodosContext } from '../ListForm';

function List({todos}: ITransferTodos) {
  const [data, setData] = useState(todos)
  const {limit} = useContext(TodosContext)
  let location = useLocation();
  const page = +location.pathname.replace(/\//ig, '');
  const start = limit * (page-1)
  useEffect(()=>{
    setData(todos)
  }, [todos])

  return ( 
    <div className="list-todos">
      {
        todos.length ?
        <TransitionGroup appear={true}>
          {
        data.slice(start, start+limit).map((todos: ITodos) => (
          <CSSTransition
          key={todos.id}
          timeout={300}
          classNames="task"
          >
            <Task task={todos} />
          </CSSTransition>
        ))
      }
      </TransitionGroup>
        :
        <h3 style={{textAlign: "center"}}>Empty list</h3>
      }
    </div>
   );
}

export default List;