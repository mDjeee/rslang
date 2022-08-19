import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { IWord } from 'src/types/IWord';
import {PageEvent} from '@angular/material/paginator';
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

  currentLevel = 0;

  length = 600;
  pageSize = 20;
  pageEvent: PageEvent | undefined;

  svg = `<svg class="svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
  <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
  <g><g><path d="M638.4,885.2c0,22.1-12.8,42.2-32.8,51.6c-7.7,3.7-16,5.4-24.3,5.4c-13,0-25.9-4.5-36.4-13.1L233.1,670.7H67.1c-31.5,0-57.1-25.5-57.1-57V386.4c0-31.5,25.5-57.1,57.1-57.1h166.1L545,70.9c17-14.1,40.7-17.1,60.7-7.7c20,9.4,32.8,29.5,32.8,51.6L638.4,885.2L638.4,885.2z M857.6,796c-1.4,0.1-2.7,0.2-4.1,0.2c-15.1,0-29.6-5.9-40.3-16.7l-7.6-7.7c-20-20-22.3-51.6-5.5-74.3c42.7-57.6,65.3-125.9,65.3-197.5c0-77-25.6-149.3-74-209c-18.4-22.7-16.7-55.6,3.9-76.3l7.6-7.6c11.4-11.4,26.7-17.6,43.2-16.6c16.1,0.8,31.1,8.4,41.3,20.9c67.2,82.2,102.7,182,102.7,288.6c0,99.3-31.4,193.8-90.8,273.3C889.3,786.6,874.1,794.9,857.6,796z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></g>
  </svg>`

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.fetchWords(this.group, this.page);
  }

  private fetchWords(group: number, page: number){
    this._Subscription = this.api.getWords(group, page).subscribe(books => {
      this.words = books;
    })
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
