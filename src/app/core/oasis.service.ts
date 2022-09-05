import { Injectable, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { IWord } from "src/types/IWord";
import { AuthService } from "../pages/auth/auth.service";
import { ApiService } from "./api.service";

@Injectable({providedIn: 'root'})
export class OasisService implements OnInit {

  _getWordsSubs: Subscription | undefined;
  _getUserWordsSubs: Subscription | undefined;
  gameWords: IWord[] = [];
  userWords: IWord[] = [];
  userWordsIds: string[] = [];

  group = Number(`${localStorage.getItem('group')}`);
  page = Math.floor(Math.random() * 30);

  userId = JSON.parse(`${localStorage.getItem('userData')}`).userId;

  constructor(private api: ApiService, private authService: AuthService) {}

  ngOnInit(): void {
  }

  fetchUserWords() {
    this._getUserWordsSubs = this.api.getUserWords(this.userId).subscribe((words: any) => {
      this.userWords = words;
      this.userWords.forEach((word: any) => {
        this.userWordsIds.push(word.wordId);
      })
    })
  }

  fetchWords(group: number, page: number) {
    this._getWordsSubs = this.api.getWords(group, page).subscribe((books: any) => {
      books.forEach((word: IWord) => {
        if(!this.userWordsIds.includes(word.id)) {
          this.gameWords.push(word);
        }
      });
      if(this.gameWords.length <= 10) {
        page--;
        if(page < 0) {
          page = 29;
        }
        this.fetchWords(group, page);
      }
      if(this.gameWords.length > 10) {
        this.gameWords = this.gameWords.slice(0, 10);
      }
    })
  }

  choseLevel(group: number) {
    this.gameWords = [];
    this.fetchUserWords();
    this.group = group;
    this.page = Math.floor(Math.random() * 30);
    this.fetchWords(this.group, this.page);
  }

  ngOnDestroy(): void {
    if(this._getUserWordsSubs) {
      this._getUserWordsSubs.unsubscribe();
    }
    if(this._getWordsSubs) {
      this._getWordsSubs.unsubscribe();
    }
  }
}
