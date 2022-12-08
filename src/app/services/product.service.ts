import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private total : number = 0;
  constructor(private angularFirestore: AngularFirestore) {

  }
  public getProducts(): Observable<Product[]> {
    return this.angularFirestore.collection("products").snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
    );
  }
  public getProductByID(id: string){
    let result = this.angularFirestore.collection("products").doc(id).valueChanges();
    return result;
  }
  public newProduct(product: Product){
    return this.angularFirestore.collection("products").add(product);
  }
  public async addToCartByID(product: Product,id: string){
    try{
      let result = await this.angularFirestore.collection("products").doc(id).update(product);
     return result
   }catch(err){
     console.log(err);
     return null;
   }
  }
}
