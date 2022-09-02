import { Injectable } from '@angular/core';
import {Subscription, timer} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  seconds!:number | string
  public subscription!: Subscription;
  audio = new Audio();
  constructor() { }

  public playSong(): void {
    this.audio.src = '../../assets/music/single.mp3';
    this.audio.load();
    this.audio.play();
  }
  public stopSong() {
    this.audio.pause();
  }


}
