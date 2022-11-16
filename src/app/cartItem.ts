import { Book } from "./models/book";

export interface CartItem{
    book: Book;
    quantity: number;
}