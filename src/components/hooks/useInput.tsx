import { useMemo, useState } from 'react';

const useInput = (title: string) => {
  const [value, setValue] = useState(title);  

  const getTagsFromTitle = (string: string) => {
    const re = /#/gi;
    const newString = string.replace(re, ' #')
    const array: string[] = newString.split(' ')
    return array.filter((str: string) => str.includes('#'))
  }

  const tags = useMemo(()=> getTagsFromTitle(value), [value])

  return {
    tags,
    setValue
  }
}

export default useInput;
