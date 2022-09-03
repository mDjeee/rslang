import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { StatisticsService } from 'src/app/core/statistics.service';
import { IDayStatistics, IUserStatistics } from 'src/types/IOptions';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  private _GetUserStatistics: Subscription | undefined;
  private userId!: string;

  visible = false;
  linearChartVisible: boolean = false;
  statisticsPerDay = {
    learned: 0,
    percent: 0,
    dataForCards: [
      {name: "Audiocall", learned: 0, correct: 0, chain: 0},
      {name: "Sprint", learned: 0, correct: 0, chain: 0},
      {name: "Oasis", learned: 0, correct: 0, chain: 0}
    ]
  }

  dataForBarChart!: {data: number[], labels: string[]};
  dataForLineChart!: {data: number[], labels: string[]};

  constructor(private api: ApiService,  private router: Router, private service: StatisticsService) {
  }

  ngOnInit(): void {
    this.userId = this.service.getUserId();
    this.getStatistics();

  }

  getStatistics() {
    this._GetUserStatistics = this.api.getUserStatistics(this.userId).subscribe({
      next: statistics => {
        this.statisticsPerDay = this.service.getStatisticsPerDay(<IUserStatistics>statistics);
        this.dataForBarChart = this.service.getDataForBarChart(<IUserStatistics>statistics);
        this.dataForLineChart = this.service.getDataForLineChart(<IUserStatistics>statistics);
        this.visible = true
      },
      error: error => {
        switch(error.status) {
          case 404:
            this.router.navigate(['/not-found']);
            break;
          case 401:
            this.router.navigate(['/authorization']);
            break;
        }
      }
    })
  }

  changeChart(event: Event) {
    const checkbox = <HTMLInputElement>event.target;
    this.linearChartVisible = checkbox.checked;
  }

  ngOnDestroy() {
    if(this._GetUserStatistics) {
      this._GetUserStatistics.unsubscribe();
    }
  }

}
