import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { getWords } from 'src/api/getWords';
import { IWord } from 'src/types/IWord';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  words = async() => {
    const response =  await getWords();
    console.log(response);
    return response;
  }

}
