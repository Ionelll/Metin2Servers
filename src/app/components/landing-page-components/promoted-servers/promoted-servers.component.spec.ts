import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotedServersComponent } from './promoted-servers.component';

describe('PromotedServersComponent', () => {
  let component: PromotedServersComponent;
  let fixture: ComponentFixture<PromotedServersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotedServersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromotedServersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
