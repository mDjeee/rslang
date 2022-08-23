import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-level-selection',
  templateUrl: './level-selection.component.html',
  styleUrls: ['./level-selection.component.css']
})
export class LevelSelectionComponent implements OnInit {

  group!: number;

  @Output()
  start = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
  }

  onChangeLevel(event: Event, level: number) {
    const levelItems = document.querySelectorAll('.level__item');
    const startButton = <HTMLButtonElement>document.querySelector('.start__btn');

    startButton.disabled = false;
    levelItems.forEach((item) => item.classList.remove('level__item_active'));
    (<HTMLElement>event.target).classList.add('level__item_active');

    this.group = level;
  }

  onStart() {
    this.start.emit(this.group);
  }

}
