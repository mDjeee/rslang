import {Component, Input, OnInit} from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  public chart: any;
  rightStat!: number;
  wrongStat!: number;
  @Input() chartRight!: number;
  @Input() chartWrong!: number
  constructor() { }

  ngOnInit(): void {
    this.createChart();
  }
  createChart(){
    this.rightStat = this.chartRight;
    this.wrongStat = this.chartWrong;
    this.chart = new Chart("MyChart", {
      type: 'pie',
      data: {
        labels: [
          'Знаю',
          'Нужно изучить :)',
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [this.rightStat, this.wrongStat],
          backgroundColor: [
            '#5961F9FF',
            '#EE9AE5FF',
          ],
          hoverOffset: 4
        }]
      },

    });
  }

}
