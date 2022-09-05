import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnInit {

  @Input() data!: number[];
  @Input() displayTitle: boolean = false;

  constructor(private elementRef: ElementRef) { }


  ngOnInit(): void {
    const htmlRef = this.elementRef.nativeElement.querySelector(`#myChart`);
    Chart.register(...registerables);
    Chart.defaults.font.family = 'Manrope';
    Chart.defaults.font.size = 16;
    Chart.defaults.color = '#272525';
    // Chart.defaults.global.defaultFontFamily = 'Manrope';
    // Chart.defaults.global.defaultFontSize = 16;
    // Chart.defaults.global.defaultFontColor = '#272525';
    const myChart = new Chart(htmlRef, {
      type: 'doughnut',
      data: {
        labels: ['Правильные', 'Неправильные'],
        datasets: [{
          data: this.data,
          backgroundColor: [
            '#5961F9FF',
            '#EE9AE5FF'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        plugins: {
            title: {
                display: this.displayTitle,
                text: this.getTitleText(this.data),
                font: {
                  size: 16,
                  family: 'Manrope',
                },
                fullSize: false ,
                padding: {
                  top: 10,
                  bottom: 10
                }
              },
            subtitle: {
              display: this.displayTitle,
              text: this.getDescriptionText(this.data),
              padding: {
                bottom: 10
              }
            }
          }
        }
    });
  }

  private getTitleText(data: number[]) {
    let text: string;
    const ending = 'Повтори слова и возвращайся снова!';
    if(data[0] < 5) {
      text = `Ты можешь лучше! ${ending}`;
    } else if (data[0] < 10) {
      text = `Хороший результат! ${ending}`;
    } else {
      text = 'Отличный результат!';
    }
    return text;
  }

  private getDescriptionText(data: number[]) {
    const declension = ['слово','слова', 'слов'];
    const declensionForCorrect = data[0] <= 1 ? declension[0] :  data[0] <= 4 ? declension[1] : declension[2];
    const declensionForWrong = data[1] === 1 ? declension[0] :  data[1] <= 4 ? declension[1] : declension[2];
    return `${data[0]} ${declensionForCorrect} изучено, ${data[1]} ${declensionForWrong} на изучении`;
  }

}
