import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FrontDeskComponent } from './front-desk.component';
import { HttpClientTestingModule,
         HttpTestingController } from '@angular/common/http/testing';
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });



    it('should find the add new product button', () => {
    const fixture = TestBed.createComponent(FrontDeskComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.tool-block button.add-button').textContent).toContain('Add New Product');
  });

    it('should call the show products function on ngOnInit', () => {
      let getProductsSpy = spyOn(component, 'getProducts');
      component.ngOnInit();
      expect(getProductsSpy).toHaveBeenCalled();
    });

    it('should start off with "panel layout" and "Add New Product +" button states on ngOnInit', () => {
    const fixture = TestBed.createComponent(FrontDeskComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.tool-block button.layout-toggle-button-narrow').textContent).toContain('Panel Layout');
    expect(compiled.querySelector('div.tool-block button.add-button').textContent).toContain('Add New Product +');
  });



});
