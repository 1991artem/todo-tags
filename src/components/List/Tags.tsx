import { useState } from "react";
import { NavLink } from "react-bootstrap";

interface ITags {
  tags: string[];
  setTag: (value: string) => void;
}

function Tags({tags, setTag}:ITags) {
  const [activeTag, setActiveTag] = useState(tags[0]);
  const tagsClickHandler = (tag: string) => {
    setTag(tag)
    setActiveTag(tag)
  }
  
  return ( 
      <ul className="tags">
        {
          tags.map(tag => 
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