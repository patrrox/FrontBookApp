import { OrderItem } from "./orderItem";
import { Recipient } from "./recipient";



export interface Order {
  recipient: Recipient;
  items: OrderItem[];
}