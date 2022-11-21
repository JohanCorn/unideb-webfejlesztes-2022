import {Book} from "./book.interface";

export interface Author {
  id?: number;
  name: string | undefined;
  books?: Book[];
}
