import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Subscription, timer} from 'rxjs';
import {SprintService} from "../../../core/sprint.service";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  @Output() public visibleStatistic = new EventEmitter()
  seconds!:number | string
  public subscription!: Subscription;
  constructor(private SprintApi: SprintService) {}
  public setFormData() {
    if (this.seconds >= 60 ) {
      this.subscription.unsubscribe();
      this.seconds = 'Время вышло';
      this.visibleStatistic.emit()
    }

  }
  ngOnInit() {
    this.subscription = timer(0, 1000).subscribe(t => {
      this.seconds = (t)
      this.setFormData();
    });
  }


  }





