import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { AudiocallService } from 'src/app/core/audiocall.service';

@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.css']
})
export class GameResultComponent implements OnInit {

  title!: string;
  text!: string;

  @Input() result: number[] = [];

  constructor(private service: AudiocallService) { }

  ngOnInit(): void {
    const data = this.service.getData();
    this.getTitleText(data);
    this.getDescriptionText(data);
    Chart.register(...registerables);
    const myChart = new Chart("myChart", {
      type: 'doughnut',
      data: {
          // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
              // label: '# of Votes',
              data: data,
              backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  // 'rgba(255, 206, 86, 0.2)',
                  // 'rgba(153, 102, 255, 0.2)',
                  // 'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  // 'rgba(255, 206, 86, 1)',
                  // 'rgba(75, 192, 192, 1)',
                  // 'rgba(153, 102, 255, 1)',
                  // 'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      // options: {
      //     scales: {
      //         y: {
      //             beginAtZero: true
      //         }
      //     }
      // }
  });
  }

  getTitleText(data: number[]) {
    let text: string;
    const ending = 'Повтори слова и возвращайся снова!';
    if(data[0] < 5) {
      text = `Ты можешь лучше! ${ending}`;
    } else if (data[0] < 10) {
      text = `Хороший результат! ${ending}`;
    } else {
      text = 'Отличный результат!';
    }
    this.title = text;

  }

  getDescriptionText(data: number[]) {
    const declension = ['слово','слова', 'слов'];
    const declensionForCorrect = data[0] <= 1 ? declension[0] :  data[0] <= 4 ? declension[1] : declension[2];
    const declensionForWrong = data[1] === 1 ? declension[0] :  data[1] <= 4 ? declension[1] : declension[2];
    this.text = `${data[0]} ${declensionForCorrect} изучено, ${data[1]} ${declensionForWrong} на изучении`;
  }

}
