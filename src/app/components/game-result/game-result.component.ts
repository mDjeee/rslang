import { Component, Input, OnInit } from '@angular/core';

import { AudiocallService } from 'src/app/core/audiocall.service';
import { answer } from 'src/types/audiocall-answer';

@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.css']
})
export class GameResultComponent implements OnInit {

  displayedColumns: string[] = ['audio', 'word', 'translate'];
  dataSource!: answer[];
  dataForChart!: number[];
  displayTitle: boolean = true;

  constructor(private service: AudiocallService) { }

  ngOnInit(): void {
    this.dataSource = this.service.answers;
    this.dataForChart = this.service.getData();
  }

}
