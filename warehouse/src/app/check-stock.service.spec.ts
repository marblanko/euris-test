import { TestBed } from '@angular/core/testing';
import { CheckStockService } from './check-stock.service';
import { IProduct } from './product';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
describe('CheckStockService', () => {

	  let httpMock: HttpTestingController;
  let checkStockService: CheckStockService;
  beforeEach(() => {
  	TestBed.configureTestingModule({
   providers: [CheckStockService],
   imports: [
        HttpClientTestingModule
    ],

  })
  	checkStockService = TestBed.get(CheckStockService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: CheckStockService = TestBed.get(CheckStockService);
    expect(service).toBeTruthy();
  });


    it('getProducts() should return a product like object', () => {

    //test against this mocked object
    const testProduct : any = 
    { 
      "title": "Batik Shirt",
      "description": "Hand made batik shirt",
      "employee": "Lorem",
      "category": "clothes",
      "price": 22
    }
    ;

    checkStockService.getProducts().subscribe((res) => {
      expect(res).toEqual(testProduct);
    });

    const req = httpMock.expectOne('http://us-central1-test-b7665.cloudfunctions.net/api/stores/ijpxNJLM732vm8AeajMR/products');
    expect(req.request.method).toEqual("GET");
    req.flush(testProduct);

    httpMock.verify();
  });

});
