import {Book} from "./book.interface";

export interface Publisher {
  id?: number;
  name: string | undefined;
  books?: Book[];
}
