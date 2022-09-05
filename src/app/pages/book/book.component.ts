import { Component, OnInit, OnDestroy } from '@angular/core';
import { catchError, map, Subscription, take } from 'rxjs';
import {ApiService, baseUrl} from 'src/app/core/api.service';
import { IWord } from 'src/types/IWord';
import { PageEvent } from '@angular/material/paginator';
import { BookService } from './book.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css', './book.component-extra.css']
})
export class BookComponent implements OnInit {

  words: IWord[] = [];
  userHardWords: any = new Set([]);
  userWords: IWord[] = [];
  userHardWordsId: any = new Set([]);
  userLearnedWordsId: any = new Set([]);
  userUnstudiedWordsId: any = new Set([]);
  counter = localStorage.getItem('counter') ? Number(localStorage.getItem('counter')) : 0;

  _SubsGetUserWord: Subscription | undefined;
  _SubsUserWord: Subscription | undefined;
  _Subscription: Subscription | undefined;
  _SubsHardWord: Subscription | undefined;
  _SubsRemoveUserWord: Subscription | undefined;


  _SubsHardWords: Subscription | undefined;
  _SubsLearndWords: Subscription | undefined;
  _SubsGetHardWords: Subscription | undefined;
  _SubsGetLearndWords: Subscription | undefined;

  group = localStorage.getItem('group') ? Number(localStorage.getItem('group')) : 0;
  page = localStorage.getItem('page') ? Number(localStorage.getItem('page')) : 0;

  baseImg = baseUrl + "/";

  isLoading = true;

  showConfig = false;
  showTranslate = true;

  isRussian = true

  currentLevel = this.group;
  currentWordIndex = 0;
  currentDictionary = 0;

  isDictionary = false;
  isHardwords = true;
  isLearned = false;
  bookPage = 0;

  pageEvent: PageEvent | undefined;

  user = this.authService.user.value;

  constructor(private api: ApiService, private bookService: BookService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.group = localStorage.getItem('group') ? Number(localStorage.getItem('group')) : 0;
    this.page = localStorage.getItem('page') ? Number(localStorage.getItem('page')) : 0;
    if(!!this.user) {
      this.fetchUserHardWords('difficult');
      this.fetchUserHardWords('studied');
    }
    this.fetchWords(this.group, this.page);
    this.bookService.fromBook = false;
  }


  private  getDefaultOptions() {
    const options = {
      isDeleted: false,
      addTime: (new Date()).toISOString(),
      games: {
        sprint: { right: 0, wrong: 0 },
        savanna: { right: 0, wrong: 0 },
        oasis: { right: 0, wrong: 0 },
        audioCall: { right: 0, wrong: 0 },
      },
      allTry: 1
    }
    return options;
  }

  private fetchWords(group: number, page: number){
    this._Subscription = this.api.getWords(group, page).subscribe((books: IWord[]) => {
      this.words = books;
      this.counter = 0;
      this.words.forEach(word => {
        if(this.userLearnedWordsId.has(word.id)) {
          this.counter++;
        }
      });
      localStorage.setItem('counter', `${this.counter}`);
      this.isLoading = false;
    })
  }

  private fetchUserHardWords(navigate: string) {
    if(this.user) {
      this._SubsHardWord = this.api.getUserWords(this.user.userId).subscribe((books: any) => {
        this.userHardWords = books;

        this.userHardWordsId = new Set([]);
        this.userLearnedWordsId = new Set([]);
        this.userUnstudiedWordsId = new Set([]);

        this.userHardWords.forEach((item: any) => {
          if(item.difficulty === 'difficult'){
            this.userHardWordsId.add(item.wordId);
          }
        })

        this.userHardWords.forEach((item: any) => {
          if(item.difficulty === 'studied'){
            this.userLearnedWordsId.add(item.wordId);
          }
        })

        this.userHardWords.forEach((item: any) => {
          if(item.difficulty === 'unstudied'){
            this.userUnstudiedWordsId.add(item.wordId);
          }
        })

        books.filter((item: any) => item.difficulty === navigate).forEach((word: any) => {
          this.loadUserWords(word.wordId);
        })
      })
    }
  }

  private loadUserWords(userWordId: string) {
    this._SubsGetUserWord = this.api.getWord(userWordId).subscribe((word: IWord) => {
      this.userWords.push(word);
    });
  }

  changePage(page: number) {
    this.bookPage = page;
    this.bookPage ? this.isDictionary = true : this.isDictionary = false;
    this.userWords = [];
    this.currentDictionary = 0;
    this.fetchUserHardWords('difficult');
  }

  addToHard(userId: string, wordId: string) {
    if(this.userLearnedWordsId.has(wordId)) {
      this.counter--;
      this.userLearnedWordsId.delete(wordId);
      this.api.getUserWord(userId, wordId).pipe(take(1)).subscribe((word: any) => {
        this._SubsHardWords = this.api.putUserWordRequest(userId, wordId, 'difficult', word.options).subscribe();
      })
    } else if(this.userUnstudiedWordsId.has(wordId)) {
      this.userUnstudiedWordsId.delete(wordId);
      this.api.getUserWord(userId, wordId).pipe(take(1)).subscribe((word: any) => {
        this._SubsHardWords = this.api.putUserWordRequest(userId, wordId, 'difficult', word.options).subscribe();
      })
    } else {
      this._SubsHardWords = this.api.postUserWordRequest(userId, wordId, 'difficult', this.getDefaultOptions()).subscribe();
    }

    this.userHardWordsId.add(wordId);
  }

  removeFromHard(userId: string, wordId: string) {
    this._SubsRemoveUserWord = this.api.getUserWord(userId, wordId).pipe(take(1)).subscribe((word: any) => {
      this.api.putUserWordRequest(userId, wordId, 'unstudied', word.options).subscribe();
    });
    this.userWords = [];
    this.fetchUserHardWords('difficult');
  }

  addToLearned(userId: string, wordId: string) {
    this.counter++;
    if(this.userHardWordsId.has(wordId)) {
      this.userHardWordsId.delete(wordId);
      this.api.getUserWord(userId, wordId).pipe(take(1)).subscribe((word: any) => {
        this._SubsLearndWords = this.api.putUserWordRequest(userId, wordId, 'studied', word.options).subscribe();
      })
    }
    else if(this.userUnstudiedWordsId.has(wordId)) {
      this.userUnstudiedWordsId.delete(wordId);
      this.api.getUserWord(userId, wordId).pipe(take(1)).subscribe((word: any) => {
        this._SubsLearndWords = this.api.putUserWordRequest(userId, wordId, 'studied', word.options).subscribe();
      })
    } else {
      this._SubsLearndWords = this.api.postUserWordRequest(userId, wordId, 'studied', this.getDefaultOptions()).subscribe();
    }

    this.userLearnedWordsId.add(wordId);
  }

  removeFromLearned(userId: string, wordId: string) {
    this._SubsRemoveUserWord = this.api.getUserWord(userId, wordId).pipe(take(1)).subscribe((word: any) => {
      this.api.putUserWordRequest(userId, wordId, 'unstudied', word.options).subscribe();
    });
    this.userWords = [];
    this.fetchUserHardWords('studied');
  }

  changeDictionaryPage(page: number) {
    this.userWords = [];
    if(page === 0) {
      this.currentDictionary = 0;
      this.isHardwords = true;
      this.isLearned = false;
      this.fetchUserHardWords('difficult');
    }
    if(page === 1) {
      this.currentDictionary = 1;
      this.isHardwords = false;
      this.isLearned = true;
      this.fetchUserHardWords('studied');
    }
  }

  changeLevel(group: number) {
    this.bookService.group = group;
    this.group = group;
    this.currentLevel = group;
    localStorage.setItem('group', `${this.group}`);
    this.movePage({pageIndex: 0})
    this.fetchWords(this.group, this.page);
  }

  movePage(currentPage: any) {
    this.page = currentPage.pageIndex;
    this.bookService.page = currentPage.pageIndex;
    localStorage.setItem('page', `${this.page}`);
    this.fetchWords(this.group, this.page);
    return currentPage;
  }

  play(src: string) {
    const audio = new Audio();
    audio.src = baseUrl + "/" + src;
    audio.load();
    audio.play();
  }

  gameFromBook(route: string) {
    this.bookService.fromBook = true;
    this.router.navigate([route]);
  }

  gameFromBookSprint(route: string) {
    this.bookService.fromBook = true;
    this.router.navigate([route + this.group]);
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
    if(this._SubsGetUserWord) {
      this._SubsGetUserWord.unsubscribe();
    }
    if(this._SubsGetHardWords) {
      this._SubsGetHardWords.unsubscribe();
    }
    if(this._SubsHardWords) {
      this._SubsHardWords.unsubscribe();
    }
    if(this._SubsGetLearndWords) {
      this._SubsGetLearndWords.unsubscribe();
    }
    if(this._SubsLearndWords) {
      this._SubsLearndWords.unsubscribe();
    }
  }
}
