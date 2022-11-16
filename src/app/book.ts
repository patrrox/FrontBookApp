import {Author} from "./author";

export interface Book {
  id: number;
  title: string;
  year: number;
  price: number;
  coverUrl: string;
  available: number;
  authors: Author[];
}