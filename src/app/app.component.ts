import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-green-grocers';
  groceries: any[] = [];
  cart: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchGroceries();
  }

  fetchGroceries() {
    const apiUrl = 'https://boolean-api-server.fly.dev/api/groceries';

    this.http.get<any[]>(apiUrl).subscribe(
      (data) => {
        this.groceries = data;
      },
      (error) => {
        console.error('Error fetching groceries:', error);
      }
    );
  }

  addToCart(item: any) {
    const existingItem = this.cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ ...item, quantity: 1 });
    }
  }

  decreaseQuantity(item: any) {
    const existingItem = this.cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem && existingItem.quantity > 1) {
      existingItem.quantity--;
    }
  }

  increaseQuantity(item: any) {
    const existingItem = this.cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity++;
    }
  }

  getTotalPrice() {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}