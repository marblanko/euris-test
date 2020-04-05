import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FrontDeskComponent } from './front-desk/front-desk.component';
import { By } from '@angular/platform-browser';

describe('AppComponent tests', () => {
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;
	const backgroundImage = '/assets/img/acme_logo.jpg';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        FrontDeskComponent
      ],
      imports: [ FormsModule, 
      			HttpClientTestingModule 
      ]
    }).compileComponents();
  }));

    beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should set banner background',()=>{
    fixture.detectChanges();
    const ele = fixture.debugElement.query(By.css('div.main')).nativeElement;
    // first thing split the address by the slash '/'
    let foundImageArray: string[] = (getComputedStyle(ele).backgroundImage).split('/');
    // make compare string out of last 3 array menbers (with added slashes) taking out the front address
    let foundImageCompare: string = '/' + foundImageArray[3] + '/' + foundImageArray[4] + '/' + foundImageArray[5];
    // hacky bit to take out the ") from the end
    foundImageCompare = foundImageCompare.slice(0, -2);
    // compare the final string 
    expect(foundImageCompare).toEqual(backgroundImage);
  });


});
