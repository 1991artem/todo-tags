import { ITodos } from "../../interfaces/interfaces";

export default class PaginationClass {
  static madePaginationsPageArray(count: number){
    const pagination: number[] = [];
    for (var i = 1; i <= count; i++) {
      pagination.push(i);
    }
    return pagination;
  }
  static madeTodosPageArray(data: ITodos[], path: string, limit: number){
    const page = +path.replace(/\//ig, '');
    const start = limit * (page-1)
    return data.slice(start, start+limit)
  }
}