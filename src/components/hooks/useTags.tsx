import { useMemo, useState } from 'react';
import { ITodos } from '../../interfaces/interfaces';

const useTags = (todos: ITodos[]) => {
  const defaultTags = ['#all']
  const [tag, setTag] = useState(defaultTags[0]);

  const tagsArray = useMemo(()=>{
    const allTags = todos.map((todo: ITodos) => todo.tags)
    const tags = new Set([...defaultTags, ...allTags.flat()]);
    return Array.from(tags)
  }, [todos])

  const getTags = (title: string): string[] => {
    const tagsArray: string[] = title.split(' ');
    const fiterTagArray =  tagsArray.filter((item:string) => {
      if(item.includes('#')){
        return item;
      } else return null
    })
    return fiterTagArray.map((item:string) =>{
      const tag =  item.split('#');
      return tag.length === 1? `#${tag[0]}`:`#${tag[1]}`
    })
  }

  return {
    tag,
    tagsArray,
    defaultTags,
    getTags,
    setTag
  }

}

export default useTags;
