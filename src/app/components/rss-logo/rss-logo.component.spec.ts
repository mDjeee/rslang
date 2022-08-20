import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RssLogoComponent } from './rss-logo.component';

describe('RssLogoComponent', () => {
  let component: RssLogoComponent;
  let fixture: ComponentFixture<RssLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RssLogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RssLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
