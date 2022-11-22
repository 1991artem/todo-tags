const addTags = (string: string, tags: string[]) => {
  const makeValue = (string: string) => {
    let str = string;
    tags.forEach((tag: string) => {
      const re = /#/gi;
      const newTag = tag.replace(re, '')
      const regex = new RegExp(newTag);
      str = str.replace(regex, tag)
    })
    return(str)
  }

  return makeValue(string)
}

export default addTags;