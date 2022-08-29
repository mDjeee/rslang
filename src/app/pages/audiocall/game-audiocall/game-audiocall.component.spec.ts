import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameAudiocallComponent } from './game-audiocall.component';

describe('GameAudiocallComponent', () => {
  let component: GameAudiocallComponent;
  let fixture: ComponentFixture<GameAudiocallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameAudiocallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameAudiocallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
