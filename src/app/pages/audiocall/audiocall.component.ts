import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { AudiocallService } from 'src/app/core/audiocall.service';
import { BookService } from '../book/book.service';


@Component({
  selector: 'app-audiocall',
  templateUrl: './audiocall.component.html',
  styleUrls: ['./audiocall.component.css']
})
export class AudiocallComponent implements OnInit {
  private _DataStatus: Subscription | undefined;
  message:boolean = false;
  status!: boolean;
  startBtnVisible: boolean = false;
  visible: boolean = true;
  end: boolean = false;
  levelSelectionVisible: boolean = true;
  start: boolean = false;
  page!: number;
  startBtn = <HTMLButtonElement>document.querySelector('.audiocall__start-btn');

  private _GetWordsStatusSubscription: Subscription | undefined;

  @Output()
  startGame = new EventEmitter;

  constructor(private service: AudiocallService, private bookService: BookService) { }

  ngOnInit(): void {
    this.service.words = [];
    if(this.bookService.fromBook) {
      this.page = this.bookService.page;
      const group = this.bookService.group;
      this.service.getUserId()
      this.levelSelectionVisible = false;
      this.visible = false;
      this._GetWordsStatusSubscription = this.service.existWordsStatus.subscribe(value => {
        this.start = value;
      });
      this.service.allFetches(this.page, group)
    }
  }

  onStart() {
    const startBtn = <HTMLButtonElement>document.querySelector('.audiocall__start-btn');
    this._GetWordsStatusSubscription = this.service.existWordsStatus.subscribe(value => this.start = value)
    this.levelSelectionVisible = false;
    this.visible = false;
    startBtn.disabled = true;
  }

  ngOnDestroy(): void {
    this.service.unSubscribe();
    if(this._GetWordsStatusSubscription) {
      this._GetWordsStatusSubscription.unsubscribe()
    }
    if(this._DataStatus) {
      this._DataStatus.unsubscribe()
    }
    this.service.page = 0;
    this.service.index = 0;
    this.service.words = [];
  }

  levelSelected() {
    const startBtn = <HTMLButtonElement>document.querySelector('.audiocall__start-btn');
    startBtn.disabled = false;
  }
}
