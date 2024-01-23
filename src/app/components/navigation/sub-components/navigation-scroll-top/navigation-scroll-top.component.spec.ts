import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationScrollTopComponent } from './navigation-scroll-top.component';

describe('NavigationScrollTopComponent', () => {
  let component: NavigationScrollTopComponent;
  let fixture: ComponentFixture<NavigationScrollTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationScrollTopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavigationScrollTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
