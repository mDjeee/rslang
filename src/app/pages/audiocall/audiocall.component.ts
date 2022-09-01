import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AudiocallService } from 'src/app/core/audiocall.service';


@Component({
  selector: 'app-audiocall',
  templateUrl: './audiocall.component.html',
  styleUrls: ['./audiocall.component.css']
})
export class AudiocallComponent implements OnInit {
  start: boolean = false;
  end: boolean = false;

  @Output()
  startGame = new EventEmitter;

  constructor(private service: AudiocallService) { }

  ngOnInit(): void {

  }

  onStartGame() {
    if (this.service.words.length) {
      this.start = true;
      this.service.getUserId();
    }
  }

  onEndGame() {
    if (this.service.words.length === this.service.answers.length) {
      console.log('end')
    }
  }

  ngOnDestroy(): void {
    this.service.unSubscribe();
  }
}
