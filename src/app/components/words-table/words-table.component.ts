import { Component, Input, OnInit } from '@angular/core';

import { answer } from 'src/types/audiocall-answer';
import {baseUrl} from "../../core/api.service";

@Component({
  selector: 'app-words-table',
  templateUrl: './words-table.component.html',
  styleUrls: ['./words-table.component.css']
})
export class WordsTableComponent implements OnInit {
  @Input() answers!: answer[];

  mistakes!: answer[];
  correct!: answer[];

  constructor() { }

  ngOnInit(): void {
    this.mistakes = this.answers.filter(item => item.result === false);
    this.correct = this.answers.filter(item => item.result === true);
  }

  play(src: string) {
    const audio = new Audio();
    audio.src = baseUrl + "/" + src;
    audio.load();
    audio.play();
  }

}
