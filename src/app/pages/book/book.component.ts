import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { IWord } from 'src/types/IWord';
import { PageEvent } from '@angular/material/paginator';
import { baseUrl } from 'src/api/baseUrl';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  words: IWord[] = [];
  _Subscription: Subscription | undefined;
  group = 0;
  page = 0;
  baseImg = baseUrl + "/";

  showConfig = false;
  showTranslate = true;

  isRussian = true

  currentLevel = 0;
  currentWordIndex = 0;

  pageEvent: PageEvent | undefined;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.fetchWords(this.group, this.page);
  }

  private fetchWords(group: number, page: number){
    this._Subscription = this.api.getWords(group, page).subscribe((books: IWord[]) => {
      console.log(books);
      this.words = books;
    })
  }

  changeWord(index: number) {
    this.currentWordIndex = index;
  }

  changeLevel(group: number) {
    this.group = group;
    this.currentLevel = group;
    this.movePage({pageIndex: 0})
    this.fetchWords(this.group, this.page);
  }

  movePage(currentPage: any) {
    this.page = currentPage.pageIndex;
    this.fetchWords(this.group, this.page);
    return currentPage;
  }

  play(src: string) {
    const audio = new Audio();
    audio.src = baseUrl + "/" + src;
    audio.load();
    audio.play()
  }

  ngOnDestroy(): void {
    if(this._Subscription) {
      this._Subscription.unsubscribe();
    }
  }
}
