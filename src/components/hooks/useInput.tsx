import { useMemo, useState } from 'react';

const useInput = (title: string) => {
  const [value, setValue] = useState(title);  

  console.log(value)

  const getTagsFromTitle = (string: string) => {
    const array: string[] = string.split(' ')
    const tagsArray = array.filter((str: string) => str.includes('#'))
    return tagsArray;
  }

  const tags = useMemo(()=> getTagsFromTitle(value), [value])

  console.log('tags', tags)
  

  return {
    tags,
    setValue
  }
}

export default useInput;
