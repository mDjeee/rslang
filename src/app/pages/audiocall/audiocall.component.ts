import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AudiocallService } from 'src/app/core/audiocall.service';
import { BookService } from '../book/book.service';


@Component({
  selector: 'app-audiocall',
  templateUrl: './audiocall.component.html',
  styleUrls: ['./audiocall.component.css']
})
export class AudiocallComponent implements OnInit {
  private _DataStatus: Subscription | undefined;
  status!: boolean;
  startBtnVisible: boolean = false;
  visible: boolean = true;
  end: boolean = false;
  levelSelectionVisible: boolean = true;
  start: boolean = false;
  startBtn = <HTMLButtonElement>document.querySelector('.start__btn');

  private _GetWordsSubscription: Subscription | undefined;

  @Output()
  startGame = new EventEmitter;

  // @Output()
  // start = new EventEmitter;

  constructor(private service: AudiocallService, private bookService: BookService) { }

  ngOnInit(): void {
    if(this.bookService.fromBook) {
      // const startBtn = <HTMLButtonElement>document.querySelector('.start__btn');
      const page = this.bookService.page;
      const group = this.bookService.group;
      this.service.fetchWords(group, page);
      this.levelSelectionVisible = false;
      this.visible = false;
      this._DataStatus = this.service.getDataStatus().subscribe(status => {
        this.status = status;
        this.start = status
      })
    }
  }


  onStartGame() {
    if (this.service.words.length) {
      this.startBtnVisible = this.status;;
      this.service.getUserId();
    }
  }

  onEndGame() {
    if (this.service.words.length === this.service.answers.length) {
      console.log('end')
    }
  }

  onStart() {
    const startBtn = <HTMLButtonElement>document.querySelector('.start__btn');
    this.start = true;
    this.levelSelectionVisible = false;
    this.visible = false;
    startBtn.disabled = true;
  }

  ngOnDestroy(): void {
    this.service.unSubscribe();
  }

  levelSelected() {
    const startBtn = <HTMLButtonElement>document.querySelector('.start__btn');
    startBtn.disabled = false;
  }
}
