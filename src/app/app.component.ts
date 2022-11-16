import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ɵsetCurrentInjector } from '@angular/core';
import { Book } from './book';
import { CartItem } from './cartItem';
import { CatalogService } from './catalog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontbookapp';
  public catalog!: Book[];
  public cartItems: CartItem[] = [];

  constructor(private catalogService: CatalogService){
  }

  public getCatalog(): void {
    this.catalogService.getCatalog().subscribe(
      (response: Book[]) => {
        console.log("Got book list: ");
        console.log(response);
        this.catalog = response;
      },
      (error: HttpErrorResponse) =>{
        console.error(error.message);
      }
    );
  }


  public addToCart(book: Book): void {
    const current: CartItem | undefined  = this.cartItems.find(x => x.book.id === book.id);
    if (current) {
      current.quantity += 1;
    } else {
      this.cartItems.push({book: book, quantity: 1} as CartItem);
    }
    console.log('Cart is: ' + JSON.stringify(this.cartItems));
  }

  public countCartItems(): number {
    return this.cartItems
    .reduce((sum,current)=> sum + current.quantity,0);
  }

  ngOnInit(): void{
    this.getCatalog();
  }

  public onOpenModal(mode: string): void {
    const container = document.getElementById('main-container')!;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'cart') {
      button.setAttribute('data-target', '#cartModal');
    }
    if (mode === 'order') {
      button.setAttribute('data-target', '#orderModal');
    }
    container.appendChild(button);
    button.click();
  }

  public totalCartAmount(): number {
    return this.cartItems
      .reduce((sum, current) => sum + current.book.price * current.quantity, 0);
  }

  public clearCart(): void {
    this.cartItems = []
  }

}
