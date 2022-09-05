import { Injectable } from '@angular/core';
import {Subscription} from 'rxjs';
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



  constructor() { }







}
