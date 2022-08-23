import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { baseUrl } from 'src/api/baseUrl';
import { ApiService } from 'src/app/core/api.service';
import { IWord } from 'src/types/IWord';

@Component({
  selector: 'app-audiocall',
  templateUrl: './audiocall.component.html',
  styleUrls: ['./audiocall.component.css']
})
export class AudiocallComponent implements OnInit {
  words: IWord[] = [];
  _Subscription: Subscription | undefined;
  group!: number;
  page = 0;
  baseImg = baseUrl + "/";

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    // this.fetchWords(this.group, this.page);
  }

  onStartGame(level: number) {
    this.group = level;
    console.log(level);
    const container = <HTMLDivElement>document.querySelector('.audiocall');
    container.innerHTML = '';
  }

  // private fetchWords(group: number, page: number){
  //   this._Subscription = this.api.getWords(group, page).subscribe(books => {
  //     console.log(books);
  //     this.words = books;
  //   })
  // }

  // changeLevel(group: number) {
  //   this.group = group;
  //   this.fetchWords(this.group, this.page);
  // }

}
