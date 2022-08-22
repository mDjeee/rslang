import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  seconds:number = 0
  constructor() {}
  ngOnInit() {

    const numbers = timer(1000, 1000);
    numbers.subscribe((x)=> {
      this.seconds = (x);
    });

  }

}
