import { Injectable } from '@angular/core';
import {Subscription, timer} from 'rxjs';
import {IDayStatistics, IUserStatistics, IUserWord, IUserWordOptions} from "../../types/IOptions";
import {ApiService} from "./api.service";
import {Router} from "@angular/router";
import {AudiocallService} from "./audiocall.service";


@Injectable({
  providedIn: 'root'
})
export class SprintService {
  seconds!:number | string
  public subscription!: Subscription;
  audio = new Audio();



  constructor(private api: ApiService, private router: Router, private apiAu: AudiocallService) { }

  public playSong(): void {
    this.audio.src = '../../assets/music/single.mp3';
    this.audio.load();
    this.audio.play();
  }






}
