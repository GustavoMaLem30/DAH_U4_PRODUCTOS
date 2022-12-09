import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.page.html',
  styleUrls: ['./view-product.page.scss'],
})
export class ViewProductPage implements OnInit {
  public product: Product;
  constructor(private productService: ProductService,private activatedRoute: ActivatedRoute) { 
    this.product = {
      name: "",
      description: "",
      price: 0,
      photo: "",
      inCar: 0
    }
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) =>{
      this.productService.getProductByID(params.id).subscribe(item => {this.product= item as Product});
    });
  }
}
