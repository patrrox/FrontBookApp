import {Author} from "./order/author";

export interface Book {
  id: number;
  title: string;
  year: number;
  price: number;
  coverUrl: string;
  available: number;
  authors: Author[];
}