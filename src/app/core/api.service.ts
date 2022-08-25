import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl, baseWordsUrl } from 'src/api/baseUrl';

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

  postUser(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${baseUrl}/users`, {
      name: name,
      email: email,
      password: password
    });

  }
}
