import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.page.html',
  styleUrls: ['./view-cart.page.scss'],
})
export class ViewCartPage implements OnInit {
  public products: Product[];
  public cartPrice: number = 0;
  constructor(private productService: ProductService) {
    this.products = []
    this.productService.getProducts().subscribe(res => {
      this.products = res;
      this.cartPrice = 0;
      for (let i = 0; i < this.products.length; i++) {
        this.cartPrice += this.products[i].inCar * this.products[i].price;
      }
      
    });
   }

  ngOnInit() {
  }
  public substractItem(product:Product,id : string){
    product.inCar = product.inCar-1;
    this.productService.addToCartByID(product,id)
  }
  public addItem(product:Product,id : string){
    product.inCar = product.inCar+1;
    this.productService.addToCartByID(product,id)
  }
  public removeItem(id : string){

  }

}
