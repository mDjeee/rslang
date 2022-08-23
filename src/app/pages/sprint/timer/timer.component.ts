import { Component, OnInit } from '@angular/core';
import {Subscription, timer} from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  seconds!:number | string
  public subscription!: Subscription;
  constructor() {}

  ngOnInit() {
    this.subscription = timer(0, 1000).subscribe(t => {
      this.seconds = (t)
      this.setFormData();
    });
  }

  private setFormData() {
    if (this.seconds >= 60 ) {
      this.subscription.unsubscribe();
      this.seconds = 'Время вышло';
    }

  }
  }





