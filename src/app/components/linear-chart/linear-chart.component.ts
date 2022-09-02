import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';

@Component({
  selector: 'app-linear-chart',
  templateUrl: './linear-chart.component.html',
  styleUrls: ['./linear-chart.component.css']
})
export class LinearChartComponent implements OnInit {
  @Input() lineChartData!: {data: number[], labels: string[]};
  @Input() displayTitle: boolean = false;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    const htmlRef = this.elementRef.nativeElement.querySelector(`#lineChart`);
    Chart.register(...registerables);
    const myChart = new Chart(htmlRef, {
      type: 'line',
      data: {
        labels: this.lineChartData.labels,
        datasets: [{
          label: 'Прогресс изучения',
          data: this.lineChartData.data,
          pointBackgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          pointHoverBackgroundColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          pointBorderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
      //  scales: {  }
      }
    });
  }

}
