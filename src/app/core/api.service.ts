import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl, baseWordsUrl } from 'src/api/baseUrl';
import { IUserStatistics, IUserWordOptions } from 'src/types/IOptions';
import { IWord } from 'src/types/IWord';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  response!: IWord[];

  constructor(private http: HttpClient) { }

  getWords(group = 0, page = 0): Observable<any> {
    return this.http.get(`${baseWordsUrl}?group=${group}&page=${page}`);
  }

  getWord(id: string): Observable<any> {
    return this.http.get(`${baseWordsUrl}/${id}`);
  }

  postUser(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${baseUrl}/users`, {
      name: name,
      email: email,
      password: password
    });
  }

  signInUser(email: string, password: string): Observable<any> {
    return this.http.post(`${baseUrl}/signin`, {
      email: email,
      password: password
    });
  }

  getUserWords(userId: string) {
    return this.http.get(`${baseUrl}/users/${userId}/words/`);
  }

  getUserWord(userId: string, wordId: string) {
    return this.http.get(`${baseUrl}/users/${userId}/words/${wordId}`);
  }

  postUserWord(userId: string, wordId: string) {
    return this.http.post(`${baseUrl}/users/${userId}/words/${wordId}`, {
      difficulty: "difficult",
      optional:{
        isDeleted: false,
        addTime: new Date(),
        games:{
          sprint: { right: 0, wrong: 0 },
          savanna: { right: 0, wrong: 0 },
          oasis: { right: 0, wrong: 0 },
          audioCall: { right: 0, wrong: 0 }
        },
        allTry:0
      }
    });
  }

  deleteUserWord(userId: string, wordId: string) {
    return this.http.delete(`${baseUrl}/users/${userId}/words/${wordId}`);
  }

  //==========================================
  postUserWordRequest(userId: string, wordId: string, difficulty: 'difficult' | 'studied', options: IUserWordOptions) {
    return this.http.post(`${baseUrl}/users/${userId}/words/${wordId}`, {
      difficulty: difficulty,
      optional: options
    });
  }

  getUserStatistics(userId: string) {
    return this.http.get(`${baseUrl}/users/${userId}/statistics`);
  }

  putUserStatistics(userId: string, options: IUserStatistics) {
    return this.http.put(`${baseUrl}/users/${userId}/statistics`, options );
  }
}
