import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {
  condition: boolean = true
  Score!: number
  constructor() {
    this.Score = 0;
  }

  startGame() {
    this.condition = !this.condition
  }
  ngOnInit(): void {

  }

}
