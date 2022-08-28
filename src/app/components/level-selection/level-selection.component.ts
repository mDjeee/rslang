import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AudiocallService } from 'src/app/core/audiocall.service';
import { IWord } from 'src/types/IWord';

@Component({
  selector: 'app-level-selection',
  templateUrl: './level-selection.component.html',
  styleUrls: ['./level-selection.component.css']
})
export class LevelSelectionComponent implements OnInit {

  words: IWord[] = [];

  @Output()
  start = new EventEmitter;

  constructor(private service: AudiocallService) { }

  ngOnInit(): void {
  }

  onChangeLevel(event: Event, level: number) {
    const levelItems = document.querySelectorAll('.level__item');
    const startButton = <HTMLButtonElement>document.querySelector('.start__btn');
    const page = this.service.getRandomIntInclusive(0, 23);

    startButton.disabled = false;

    levelItems.forEach((item) => item.classList.remove('level__item_active'));
    (<HTMLElement>event.target).classList.add('level__item_active');

    this.service.fetchWords(level, page);
  }

  onStart() {
    this.start.emit();
  }

  ngOnDestroy(): void {
  }

}
