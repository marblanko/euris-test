import { Component, OnInit } from '@angular/core';
import { CheckStockService } from '../check-stock.service';
import { IProduct } from '../product';

@Component({
  selector: 'app-front-desk',
  templateUrl: './front-desk.component.html',
  styleUrls: ['./front-desk.component.css']
})
export class FrontDeskComponent implements OnInit {
	products : IProduct[];
	singleProduct : IProduct[] =  [];
	errorMessage : string;
	serverName: string = '';
	productObject: IProduct[] =  [];
	prodTitle : string;
	prodCategory : string;
	prodPrice : number;
	prodEmployee : string;
	prodDesc : string;
	isWide : boolean;
	menuOpen : boolean;


  constructor(private checkStockService : CheckStockService) { }

  ngOnInit() {

  	let isWide = false;
  	let menuOpen = false;
  	this.getProducts();
  }

  getProducts() {
  	this.checkStockService.getProducts().subscribe(
		products => {
			this.products = products;
		},
		error => this.errorMessage = <any>error
	);
  }

  addProduct(product: IProduct) {
  	let productObject = {
  		title : this.prodTitle,
  		category : this.prodCategory,
  		price : this.prodPrice,
  		employee : this.prodEmployee,
  		description : this.prodDesc
  		}
  	   this.checkStockService.addProduct( productObject as IProduct)
       .subscribe(product => {
        this.products.push(product);
	    console.dir(product);
	  });
  
}



  delProduct(product: IProduct): void {
    this.products = this.products.filter(h => h !== product);
    this.checkStockService.delProduct(product).subscribe();
  }


}

