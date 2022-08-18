import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationBtnComponent } from './authorization-btn.component';

describe('AuthorizationBtnComponent', () => {
  let component: AuthorizationBtnComponent;
  let fixture: ComponentFixture<AuthorizationBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizationBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizationBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
