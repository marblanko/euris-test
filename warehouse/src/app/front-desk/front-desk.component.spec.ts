import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FrontDeskComponent } from './front-desk.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('FrontDeskComponent', () => {
  let component: FrontDeskComponent;
  let fixture: ComponentFixture<FrontDeskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontDeskComponent ],
      imports: [ FormsModule, HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the front-desk component', () => {
    expect(component).toBeTruthy();
  });

  it('should run the getProducts function on ngOnInit', () => {
      let getProductsSpy = spyOn(component, 'getProducts');
      component.ngOnInit();
      expect(getProductsSpy).toHaveBeenCalled();
  });


  it('should find the proper content in the "panel layout" and "Add New Product +" buttons', () => {
    const fixture = TestBed.createComponent(FrontDeskComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.tool-block button.layout-toggle-button-narrow').textContent).toContain('Panel Layout');
    expect(compiled.querySelector('div.tool-block button.add-button').textContent).toContain('Add New Product +');
  });

 it('should call addProduct function when clicking on "add product" button', async(() => {   
    spyOn(component, 'addProduct');
    component.menuOpen = true; // toggling to true so test can find button to click
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    let addProdButton = fixture.debugElement.query(By.css('button.add-new-product')).nativeElement; // modify here
    console.log(addProdButton);
    addProdButton.click();
    expect(component.addProduct).toHaveBeenCalled();
  }));

});
