import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {IWordGame} from "../../../types/IWord";
import {ApiService} from "../../core/api.service";
import {group} from "@angular/animations";



@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {
  Score!: number
  public  level!: IWordGame[];
  constructor(private router: Router,private api: ApiService) {
    this.Score = 0;
  }
  choiceLevel() {

}
  ngOnInit(): void {

  }

}
