import { TestBed } from '@angular/core/testing';
import { CheckStockService } from './check-stock.service';
import { IProduct } from './product';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('CheckStockService tests', () => {

  let httpMock: HttpTestingController;
  let service: CheckStockService;
  const testMockProduct : any = 
    { "id": "TESTID",
      "data": { 
      "title": "Test Product",
      "description": "Mocked data for testing",
      "employee": "Jasmine Test",
      "category": "Tests",
      "price": 55
    }
  };
 

  beforeEach(() => {  
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [CheckStockService]
    });
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(CheckStockService);
  });

  it('should be created', done => {
    expect(service).toBeTruthy();
    done();
  });

  describe('Testing all the functions that do API calls', () => {

    it('getProducts should GET products', (done) => {
      service.getProducts().subscribe(res => done());
      const successRequest = httpMock.expectOne('http://us-central1-test-b7665.cloudfunctions.net/api/stores/ijpxNJLM732vm8AeajMR/products');
      expect(successRequest.request.method).toEqual('GET');
      successRequest.flush(null);
      httpMock.verify();
    });

    it('addProduct should POST test product', (done) => {
      service.addProduct(testMockProduct).subscribe(res => done());
      const successRequest = httpMock.expectOne('http://us-central1-test-b7665.cloudfunctions.net/api/stores/ijpxNJLM732vm8AeajMR/products');
      expect(successRequest.request.method).toEqual('POST');
      successRequest.flush(null);
      httpMock.verify();
    });

    it('delProduct should DELETE test product', (done) => {
      service.delProduct(testMockProduct).subscribe(res => done());
      const successRequest = httpMock.expectOne('http://us-central1-test-b7665.cloudfunctions.net/api/stores/ijpxNJLM732vm8AeajMR/products/' + testMockProduct.id);
      expect(successRequest.request.method).toEqual('DELETE');
      successRequest.flush(null);
      httpMock.verify();
    });

  });

});

