import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { IWord } from 'src/types/IWord';

@Component({
  selector: 'app-level-selection',
  templateUrl: './level-selection.component.html',
  styleUrls: ['./level-selection.component.css']
})
export class LevelSelectionComponent implements OnInit {

  group!: number;
  page!: number;
  words: IWord[] = [];
  _Subscription: Subscription | undefined;

  @Output()
  start = new EventEmitter;
  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  onChangeLevel(event: Event, level: number) {
    const levelItems = document.querySelectorAll('.level__item');
    const startButton = <HTMLButtonElement>document.querySelector('.start__btn');
    startButton.disabled = false;

    levelItems.forEach((item) => item.classList.remove('level__item_active'));
    (<HTMLElement>event.target).classList.add('level__item_active');

    this.group = level;
    this.page = this.getRandomIntInclusive(0, 23);
    this.fetchWords(this.group, this.page);
  }

  private fetchWords(group: number, page: number){
    this._Subscription = this.api.getWords(group, page).subscribe(books => {
      this.words = books;
      this.words.sort(() => this.getRandomIntInclusive(-1, 1));
    })
  }

  getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  onStart() {
    this.start.emit(this.words);
  }

  ngOnDestroy(): void {
    if(this._Subscription) {
      this._Subscription.unsubscribe();
    }
  }

}
