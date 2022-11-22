import { useState } from "react";
import { NavLink } from "react-bootstrap";

interface ITags {
  tags: string[];
  tag: string;
  setTag: (value: string) => void;
}

function Tags({tags, setTag, tag}:ITags) {
  const allTag = [tag]
  const tagsArray = [...allTag, ...tags]
  const [activeTag, setActiveTag] = useState(tagsArray[0]);
  const tagsClickHandler = (tag: string) => {
    setActiveTag(tag)
    setTag(tag)
  }
  
  return ( 
      <ul className="tags">
        tags: 
        {
          tagsArray.map(tag => 
          <li key={tag}
          onClick={()=>tagsClickHandler(tag)}>
            <NavLink
            className={activeTag===tag? 'active-tag' : ''}
            >
              {tag}
            </NavLink>
          </li>)
        }
      </ul>
    );
}

export default Tags;