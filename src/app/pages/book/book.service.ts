import { Injectable, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Subscription } from "rxjs";
import { ApiService, baseUrl } from "src/app/core/api.service";
import { IWord } from "src/types/IWord";

@Injectable({providedIn: 'root'})
export class BookService implements OnInit{

  group = 0;
  page = 0;

  fromBook = false;

  userHardWords: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit():void {
    this.group = localStorage.getItem('group') ? Number(localStorage.getItem('group')) : 0;
    this.page = localStorage.getItem('page') ? Number(localStorage.getItem('page')) : 0;
  }

}
