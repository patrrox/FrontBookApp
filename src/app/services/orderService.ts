import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Book} from "../models/book";
import {Order} from "../models/order/order";
import {CartItem} from "../cartItem";
import {OrderItem} from "../models/order/orderItem";
import { Recipient } from '../models/order/recipient';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public submitOrder(recipient: Recipient, cartItems: CartItem[]): Observable<any> {
    const orderItems: OrderItem[] = cartItems.map(item => {
      return {bookId: item.book.id, quantity: item.quantity} as OrderItem;
    });
    const order: Order = {recipient: recipient, items: orderItems} as Order
    console.log(order)
    return this.http.post(`${this.apiServerUrl}/orders`, order)
  }
}