import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { IDayStatistics, IUserStatistics } from 'src/types/IOptions';

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
  dataForBarChart!: {data: number[], labels: string[]};
  private userId!: string;
  private date = (new Date()).toISOString();
  visible = false;
  learned!: number;
  percent!: number;
  linearChartVisible: boolean = false;
  dataForCards = [
    {name: "Audiocall", learned: 0, correct: 0, chain: 0},
    {name: "Sprint", learned: 0, correct: 0, chain: 0},
    {name: "Oasis", learned: 0, correct: 0, chain: 0}
  ]

  constructor(private api: ApiService, private router: Router) { }

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
          this.percent = this.getPercent(todaysData.allWords, this.learned);
          this.getDataForCards(todaysData);
        }
        this.dataForBarChart = this.getDataForBarChart(<IUserStatistics>statistics);
        this.visible = true
      },
      error: error => {
        switch(error.status) {
          case 404:
            console.log('not found')
            break;
          case 401:
            this.router.navigate(['/authorization']);
            break;
        }
      }
    })
  }

  private getDataForCards(statistics: IDayStatistics) {
    const audiocall = statistics.games.audiocall;
    const sprint = statistics.games.sprint;
    const oasis = statistics.games.oasis;

    const audiocallWords = audiocall.correct + audiocall.wrong;
    const sprintWords = sprint.correct + sprint.wrong;
    const oasisWords = oasis.correct + oasis.wrong;

    const audiocallWordsPercent = audiocallWords ? this.getPercent(audiocallWords, audiocall.correct) : 0;
    const sprintWordsPercent = sprintWords ? this.getPercent(sprintWords, sprint.correct) : 0;
    const oasisWordsPercent = oasisWords ? this.getPercent(oasisWords, oasis.correct) : 0;

    this.dataForCards = [
      {name: "Audiocall", learned: audiocall.correct, correct: audiocallWordsPercent, chain: audiocall.chain},
      {name: "Sprint", learned: sprint.correct, correct: sprintWordsPercent, chain: sprint.chain},
      {name: "Oasis", learned: oasis.correct, correct: oasisWordsPercent, chain: oasis.chain}
    ]
  }

  getDataForBarChart(statistics: IUserStatistics) {
    const labels = statistics.optional.stat.allStat.map((item: IDayStatistics) => item.date.slice(0, 10));
    const data = statistics.optional.stat.allStat.map((item: IDayStatistics) => item.correctAnswers);
    console.log('getDataForBarChart', {data: data, labels: labels})
    return {data: data, labels: labels};
  }

  getPercent(base: number, amount: number) {
    return Math.round(amount / base * 100);
  }

  getUserId() {
    const userData = <string>window.localStorage.getItem('userData');
    const userId = JSON.parse(userData).userId;
    this.userId = userId;
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
