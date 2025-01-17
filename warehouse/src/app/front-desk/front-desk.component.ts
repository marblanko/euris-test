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
	errorMessage : string;
	productObject: IProduct[];
	prodTitle : string;
	prodCategory : string;
	prodPrice : number;
	prodEmployee : string;
	prodDesc : string;
	isWide : boolean = false;
	menuOpen : boolean = false;
	alertBox : boolean = false;
	alertBoxClass : string; 
	alertBoxContent : string;

  constructor(private checkStockService : CheckStockService) { }

  ngOnInit() {
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

  addProduct() {
  	let productObject = {
  		title : this.prodTitle,
  		category : this.prodCategory,
  		price : this.prodPrice,
  		employee : this.prodEmployee,
  		description : this.prodDesc
  	}

	this.checkStockService.addProduct( productObject as IProduct).subscribe(
		product => this.alertDisplay('added') 
		);
  }

  delProduct(product: IProduct): void {
    this.products = this.products.filter(h => h !== product);
    this.checkStockService.delProduct(product).subscribe(
    	product => this.alertDisplay('deleted')
    	);
  }

  alertDisplay(action : string) {
  	this.menuOpen = false;
  	this.alertBoxClass = action;
  	this.alertBox = true;
  	this.alertBoxContent = 'Succesfully ' + action + ' a product';
  	setTimeout(() => this.alertBox = false, 2500);
 	this.getProducts();
  }

}

