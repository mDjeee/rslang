import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseWordsUrl } from 'src/api/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getWords(group = 0, page = 0): Observable<any> {
    return this.http.get(`${baseWordsUrl}?group=${group}&page=${page}`);
  }

  getWord(id: number): Observable<any> {
    return this.http.get(`${baseWordsUrl}?${id}`);
  }
}
