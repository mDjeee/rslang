import { Injectable, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { IUserStatistics, IUserWord, IUserWordOptions } from "src/types/IOptions";
import { IWord } from "src/types/IWord";
import { AuthService } from "../pages/auth/auth.service";
import { BookService } from "../pages/book/book.service";
import { ApiService } from "./api.service";
import { AudiocallService } from "./audiocall.service";

@Injectable({providedIn: 'root'})
export class OasisService implements OnInit {

  private _GetUserWordSubscription: Subscription | undefined;
  private _PostUserWordSubscription: Subscription | undefined;

  _getWordsSubs: Subscription | undefined;
  _getUserWordsSubs: Subscription | undefined;
  gameWords: IWord[] = [];
  userWords: IWord[] = [];
  userWordsIds: string[] = [];

  fromBook = this.bookService.fromBook;


  private existWordOptions!: IUserWordOptions;
  private date = (new Date()).toISOString();

  group = Number(`${localStorage.getItem('group')}`);
  page = Math.floor(Math.random() * 30);

  userId = JSON.parse(`${localStorage.getItem('userData')}`).userId;

  constructor(private api: ApiService, private bookService: BookService) {}

  ngOnInit(): void {
    if(this.fromBook) {
      this.choseLevel(0);
    }
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
    if(this.fromBook) {
      this.group = +`${localStorage.getItem('group')}`;
      this.page = +`${localStorage.getItem('page')}`;
    }
    this.fetchWords(this.group, this.page);
    console.log(this.page)
  }

  private  getChangedOptions(options: IUserWordOptions, answer: boolean) {
    options.allTry++;
    options.games.oasis.right += +answer;
    options.games.oasis.wrong += +!answer;

    return options;
  }

  getUserWord(userId: string, wordId: string, answer?: boolean) {
    this._GetUserWordSubscription = this.api.getUserWord(userId, wordId).subscribe( {
      next: (word: any) => {
        this.existWordOptions = this.getChangedOptions((<IUserWord>word).optional, <boolean>answer);
        this.api.putUserWordRequest(userId, wordId, 'studied', this.existWordOptions);
      },
      error: (error: any) => {
        switch(error.status) {
          case 404:
            this.postUserWord(userId, wordId, 'studied', this.getDefaultOptions(<boolean>answer));
            break;
        }
      }
    });
  }

  private postUserWord(userId: string, wordId: string, difficulty: 'difficult' | 'studied', options: IUserWordOptions) {
    this._PostUserWordSubscription = this.api.postUserWordRequest(userId, wordId, difficulty, options).subscribe((resp: any) => resp);
  }

  private  getDefaultOptions(answer: boolean) {
    const options = {
      isDeleted: false,
      addTime: (new Date()).toISOString(),
      games: {
        sprint: { right: 0, wrong: 0 },
        savanna: { right: 0, wrong: 0 },
        oasis: { right: 0 | +answer, wrong: 0 | +!answer },
        audioCall: { right: 0, wrong: 0 },
      },
      allTry: 1
    }
    return options;
  }

  ngOnDestroy(): void {
    if(this._getUserWordsSubs) {
      this._getUserWordsSubs.unsubscribe();
    }
    if(this._getWordsSubs) {
      this._getWordsSubs.unsubscribe();
    }

    if(this._GetUserWordSubscription) {
      this._GetUserWordSubscription.unsubscribe();
    }
    if (this._PostUserWordSubscription) {
      this._PostUserWordSubscription.unsubscribe();
    }
  }

  unsubscribe(): void {
    if(this._getUserWordsSubs) {
      this._getUserWordsSubs.unsubscribe();
    }
    if(this._getWordsSubs) {
      this._getWordsSubs.unsubscribe();
    }

    if(this._GetUserWordSubscription) {
      this._GetUserWordSubscription.unsubscribe();
    }
    if (this._PostUserWordSubscription) {
      this._PostUserWordSubscription.unsubscribe();
    }
  }
}
