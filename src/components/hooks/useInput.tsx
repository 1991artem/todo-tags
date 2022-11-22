import { useMemo, useState, useEffect } from 'react';

const useInput = (string: string) => {
  const [value, setValue] = useState(string);  

  const getTagsFromTitle = (string: string) => {
    const re = /#/gi;
    const newString = string.replace(re, ' #')
    const array: string[] = newString.split(' ')
    return array.filter((str: string) => str.includes('#'))
  }

  const clearTittle = (string: string) => {
    const re = /#/gi;
    return string.replace(re, ' ')
  }

  const title = useMemo(()=> clearTittle(value), [value])

  const tags = useMemo(()=> getTagsFromTitle(value), [value])

  return {
    tags,
    title,
    value,
    setValue
  }
}

export default useInput;
