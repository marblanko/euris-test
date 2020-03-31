import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IProduct } from './product';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckStockService {

	private storeUrl = 'http://us-central1-test-b7665.cloudfunctions.net/api/stores/ijpxNJLM732vm8AeajMR/products';
	private mockUrl = 'http://localhost/php_quimm/api/mock-data/products.json';
httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private http : HttpClient,
    private messageService: MessageService ) {}


  	getProducts() : Observable<IProduct[]> {
		return this.http.get<IProduct[]>(this.storeUrl).pipe(
			 tap(data => console.log(JSON.stringify(data))),
			catchError(this.handleError)
			);
	}

	addProduct (product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.storeUrl, product, this.httpOptions).pipe(
       tap((newProduct: IProduct) => this.log(`added product w/ id=${newProduct.id}`)),
      catchError(this.handleError)
    );
  }


  delProduct (product: IProduct | number): Observable<IProduct> {
    const id = typeof product === 'number' ? product : product.id;
    const url = `${this.storeUrl}/${id}`;

    return this.http.delete<IProduct>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted product id=${id}`)),
      catchError(this.handleError)
    );
  }




		private handleError(err: HttpErrorResponse) {
		let errorMessage = '';
		if (err.error instanceof ErrorEvent) {
			errorMessage = `An error occurred: ${err.error.message}`;
		} else {
			errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
		}
		console.error(errorMessage);
		return throwError(errorMessage);

	}

	  private log(message: string) {
    this.messageService.add(`ProductService: ${message}`);
  }



}
