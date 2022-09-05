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

  @Output() levelSelected = new EventEmitter;

  constructor(private service: AudiocallService) { }

  ngOnInit(): void {
  }

  onChangeLevel(level: number) {

    const levelItems = document.querySelectorAll('.level__item');
    const page = this.service.getRandomIntInclusive(0, 1);

    this.levelSelected.emit();
    levelItems.forEach((item) => item.classList.remove('level__item_active'));
    levelItems[level].classList.add('level__item_active');
    this.service.getUserId();
    this.service.fetchWords(level, page);
  }

  ngOnDestroy(): void {
  }

}
