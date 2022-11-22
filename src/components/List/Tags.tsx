import { useState } from "react";
import { NavLink } from "react-bootstrap";

interface ITags {
  tags: string[];
  setTag: (value: string) => void;
}

function Tags({tags, setTag}:ITags) {
  const allTag = ['all']
  const tagsArray = [...allTag, ...tags]
  const [activeTag, setActiveTag] = useState(tagsArray[0]);
  const tagsClickHandler = (tag: string) => {
    setActiveTag(tag)
    setTag(tag)
  }
  
  return ( 
      <ul className="tags">
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