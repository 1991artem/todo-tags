import { ITodos } from '../../interfaces/interfaces';

export default class TagsClass {
  static madeTagsArray(todos: ITodos[]){
    const allTags = todos.map((todo: ITodos) => todo.tags)
    const tags = new Set(allTags.flat());
    return Array.from(tags)
  }
}