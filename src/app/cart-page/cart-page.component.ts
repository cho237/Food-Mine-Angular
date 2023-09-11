import {Component} from '@angular/core';
import {CartService} from "../services/cart/cart.service";
import {Cart} from "../shared/models/cart";
import {CartItem} from "../shared/models/cartItem";


@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cart!:Cart;
  constructor(private cartService: CartService, ) {
    this.setCart();
  }
  changeQuantity(cartItem: CartItem, quantityInString: string,) {
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food!.id, quantity)
    this.setCart();
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeItemFromCart(cartItem.food!.id);
    this.setCart();
  }

  setCart() {
    this.cart = this.cartService.getCart();
  }


}
