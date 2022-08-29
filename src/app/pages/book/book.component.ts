import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { IWord } from 'src/types/IWord';
import { PageEvent } from '@angular/material/paginator';
import { baseUrl } from 'src/api/baseUrl';
import { BookService } from './book.service';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  words: IWord[] = [];
  userHardWords: any = [];

  _SubsUserWord: Subscription | undefined;
  _Subscription: Subscription | undefined;
  _SubsHardWord: Subscription | undefined;
  group = this.bookService.group;
  page = this.bookService.page;
  baseImg = baseUrl + "/";

  showConfig = false;
  showTranslate = true;

  isRussian = true

  currentLevel = 0;
  currentWordIndex = 0;

  isDictionary = false;
  bookPage = 0;

  pageEvent: PageEvent | undefined;

  user = this.authService.user.value;

  constructor(private api: ApiService, private bookService: BookService, private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchWords(this.group, this.page);
    if(!!this.user) {
      this.fetchUserHardWords();
    }
  }

  private fetchWords(group: number, page: number){
    this._Subscription = this.api.getWords(group, page).subscribe((books: IWord[]) => {
      console.log(books);
      this.words = books;
    })
  }

  private fetchUserHardWords() {
    if(this.user) {
      this._SubsHardWord = this.api.getUserWords(this.user.userId).subscribe((books) => {
        this.userHardWords = books;
        console.log(this.userHardWords)
      })
    }
  }

  changePage(page: number) {
    this.bookPage = page;
    this.bookPage ? this.isDictionary = true : this.isDictionary = false;
  }

  addToHard(userId: string, wordId: string) {
    this._SubsUserWord = this.api.postUserWord(userId, wordId).subscribe();
  }

  changeLevel(group: number) {
    this.bookService.group = group;
    this.group = group;
    this.currentLevel = group;
    this.movePage({pageIndex: 0})
    this.fetchWords(this.group, this.page);
  }

  movePage(currentPage: any) {
    this.page = currentPage.pageIndex;
    this.bookService.page = currentPage.pageIndex;
    this.fetchWords(this.group, this.page);
    return currentPage;
  }

  play(src: string) {
    const audio = new Audio();
    audio.src = baseUrl + "/" + src;
    audio.load();
    audio.play();
  }

  ngOnDestroy(): void {
    if(this._Subscription) {
      this._Subscription.unsubscribe();
    }
    if(this._SubsHardWord) {
      this._SubsHardWord.unsubscribe();
    }
    if(this._SubsUserWord) {
      this._SubsUserWord.unsubscribe();
    }
  }
}
