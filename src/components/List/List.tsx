import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { ITodos } from "../../interfaces/interfaces";
import './task.scss';
import Task from "./Task";

interface IList {
  todos: ITodos[];
}

function List({todos}: IList) {
  return ( 
    <div className="list-todos">
      {
        todos.length ?
        <TransitionGroup appear={true}>
          {
        todos.map((todos: ITodos) => (
          <CSSTransition
          key={todos.id}
          timeout={500}
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