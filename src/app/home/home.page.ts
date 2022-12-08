import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public products: Product[]
  constructor(private productService: ProductService, private router: Router,private toastController: ToastController) {
    this.productService.getProducts().subscribe(res => {
      this.products = res;
    });
  }
  public getProductByID(id: string) {
    this.router.navigate(['view-product'], {
      queryParams: { id: id },
    });

  }
  public addToCartByID(product: Product,id: string) {
    product.inCar = product.inCar+1;
    this.productService.addToCartByID(product,id)
    this.presentToast('bottom','Se agrego el producto corretamente',()=>{
      this.goToCar();
    });
  }
  public async presentToast(position: 'top' | 'middle' | 'bottom', message:string,callback) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position,
      cssClass: 'custom-toast',
      buttons: [
        {
          text: 'Ver carrito',
          handler: () => {
            callback();
          }
        }
      ]
    });

    await toast.present();
  }
  public goToCar() {
    this.router.navigate(['view-cart'], {
    });  
  }
  public addNewProduct() {
    this.router.navigate(['new-product'], {
    });
  }

}
