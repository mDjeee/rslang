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
  footerVisible: boolean = true


  constructor(private api: ApiService, private router: Router, private apiAu: AudiocallService) { }

  public footerView(view: boolean) {
    return  view;
  }


}
