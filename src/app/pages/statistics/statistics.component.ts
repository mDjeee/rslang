import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { IUserStatistics } from 'src/types/IOptions';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  private _GetUserStatistics: Subscription | undefined;
  dataForChart: number[] = [1,1];
  displayTitle = false;
  statistics!: IUserStatistics;
  private userId!: string;
  private date = (new Date()).toISOString();
  visible = false;
  learned!: number;
  percent!: number;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getUserId();
    this.getStatistics();
  }

  getStatistics() {
    this._GetUserStatistics = this.api.getUserStatistics(this.userId).subscribe({
      next: statistics => {
        const allStat = (<IUserStatistics>statistics).optional.stat.allStat;
        const [todaysData] = allStat.filter(item => item.date.slice(0, 10) === this.date.slice(0, 10))
        if(todaysData) {
          this.learned = todaysData.correctAnswers;
          this.percent = Math.round(this.learned / todaysData.allWords * 100);
        }
        this.visible = true
        console.log(todaysData)
      },
      error: error => {
        switch(error.status) {
          case 404:
            console.log('not found')
            break;
          case 401:
            //TODO вывести сообщение или выдать окно входа?
            console.log('invalid token');
            break;
        }
      }
    })
  }

  getUserId() {
    const userData = <string>window.localStorage.getItem('userData');
    const userId = JSON.parse(userData).userId;
    this.userId = userId;
  }

  ngOnDestroy() {
    if(this._GetUserStatistics) {
      this._GetUserStatistics.unsubscribe();
    }
  }

}
