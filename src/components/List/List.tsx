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
        !todos.length? <h3 style={{textAlign: "center"}}>Empty list</h3>
        : 
        todos.map((todos: ITodos, index: number) => {
          return <Task task={todos} key={index} />
        })
      }
    </div>
   );
}

export default List;