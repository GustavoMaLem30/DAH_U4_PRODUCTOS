import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
})
export class NewProductPage implements OnInit {
  product : Product;
  name = ""
  description = ""
  price = 0
  photo = ""
  constructor(private productService:ProductService,private toastController: ToastController) { }

  ngOnInit() {
  }
  public async presentToast(position: 'top' | 'middle' | 'bottom', message:string,callback) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position,
      cssClass: 'custom-toast'
    });

    await toast.present();
  }

  public newProduct() {
    this.product = {
      name: this.name,
      description: this.description,
      price: this.price,
      photo: this.photo,
      inCar: 0
    }
    this.name = ""
    this.description = ""
    this.price = 0
    this.photo = ""
   this.productService.newProduct(this.product);
   this.presentToast('bottom','¡Se agrego el producto corretamente!',()=>{
  });
  }

}
