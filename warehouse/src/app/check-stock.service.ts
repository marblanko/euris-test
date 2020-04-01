import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IProduct } from './product';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
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
		return this.http.get<IProduct[]>(this.storeUrl, this.httpOptions).pipe(
			catchError(this.handleError)
			);
	}

	addProduct (product: IProduct): Observable<IProduct> {
		let newProduct : string = JSON.stringify(product);
	    return this.http.post<IProduct>(this.storeUrl, JSON.parse(newProduct), this.httpOptions).pipe(
      		catchError(this.handleError<IProduct>('addProduct'))
    	);
  }


  delProduct (product: IProduct | number): Observable<IProduct> {
    	const id = typeof product === 'number' ? product : product.id;
    	const url = `${this.storeUrl}/${id}`;
    	return this.http.delete<IProduct>(url, this.httpOptions).pipe(
      		catchError(this.handleError)
    	);
  }


  private handleError<T> (operation = 'operation', result?: T) {
  	  return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

}
