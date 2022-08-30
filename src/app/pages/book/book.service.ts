import { Injectable, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Subscription } from "rxjs";
import { baseUrl } from "src/api/baseUrl";
import { ApiService } from "src/app/core/api.service";
import { IWord } from "src/types/IWord";

@Injectable({providedIn: 'root'})
export class BookService implements OnInit{
  group = 0;
  page = 0;

  userHardWords: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit():void {
  }

}
