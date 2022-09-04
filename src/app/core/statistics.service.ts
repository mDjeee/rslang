import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IDayStatistics, IUserStatistics } from 'src/types/IOptions';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private date = (new Date()).toISOString();

  dataForBarChart!: {data: number[], labels: string[]};

  statisticsPerDay = {
    learned: 0,
    percent: 0,
    dataForCards: [
      {name: "Audiocall", learned: 0, correct: 0, chain: 0},
      {name: "Sprint", learned: 0, correct: 0, chain: 0},
      {name: "Oasis", learned: 0, correct: 0, chain: 0}
    ]
  }


  constructor() {  }


  getStatisticsPerDay(statistics: IUserStatistics) {
    const allStat = statistics.optional.stat.allStat;
    const [todaysData] = allStat.filter(item => item.date.slice(0, 10) === this.date.slice(0, 10));
    const statisticsPerDay = {
      learned: 0,
      percent: 0,
      dataForCards: this.getDataForCards(todaysData)
    }

    if(todaysData) {
      statisticsPerDay.learned = todaysData.correctAnswers,
      statisticsPerDay.percent = this.getPercent(todaysData.allWords, statisticsPerDay.learned);
    }

    return statisticsPerDay;
  }

  private getPercent(base: number, amount: number) {
    return Math.round(amount / base * 100);
  }

  private getDataForCards(statistics: IDayStatistics) {
    if (!statistics) return this.statisticsPerDay.dataForCards;
    const audiocall = statistics.games.audiocall;
    const sprint = statistics.games.sprint;
    const oasis = statistics.games.oasis;

    const audiocallWords = audiocall.correct + audiocall.wrong;
    const sprintWords = sprint.correct + sprint.wrong;
    const oasisWords = oasis.correct + oasis.wrong;

    const audiocallWordsPercent = audiocallWords ? this.getPercent(audiocallWords, audiocall.correct) : 0;
    const sprintWordsPercent = sprintWords ? this.getPercent(sprintWords, sprint.correct) : 0;
    const oasisWordsPercent = oasisWords ? this.getPercent(oasisWords, oasis.correct) : 0;

    return [
      {name: "Audiocall", learned: audiocall.correct, correct: audiocallWordsPercent, chain: audiocall.chain},
      {name: "Sprint", learned: sprint.correct, correct: sprintWordsPercent, chain: sprint.chain},
      {name: "Oasis", learned: oasis.correct, correct: oasisWordsPercent, chain: oasis.chain}
    ]
  }

  getDataForLineChart(statistics: IUserStatistics) {
    const labels = statistics.optional.stat.allStat.map((item: IDayStatistics) => item.date.slice(0, 10));
    const data = statistics.optional.stat.allStat.map((item: IDayStatistics) => item.correctAnswers);
    return {data: data, labels: labels};
  }

  getDataForBarChart(statistics: IUserStatistics) {
    const labels = statistics.optional.stat.allStat.map((item: IDayStatistics) => item.date.slice(0, 10));
    const data = statistics.optional.stat.allStat.map((item: IDayStatistics) => item.amountNewWordsPerDey);
    return {data: data, labels: labels};
  }

  getUserId() {
    const userData = <string>window.localStorage.getItem('userData');
    const userId = JSON.parse(userData).userId;
    return userId;
  }

}
