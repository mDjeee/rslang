import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  @Input() barChartData!: {data: number[], labels: string[]};
  @Input() displayTitle: boolean = false;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    const htmlRef = this.elementRef.nativeElement.querySelector(`#barChart`);
    Chart.register(...registerables);
    console.log(this.barChartData);
    const myChart = new Chart(htmlRef, {
      type: 'bar',
      data: {
        labels: this.barChartData.labels,
        datasets: [{
          label: 'Количество изученных слов по дням',
          data: this.barChartData.data,
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
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
        scales: {
          y: {
            beginAtZero: true,
          }
        }
      }
    });
  }

}
