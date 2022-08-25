import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "src/app/core/api.service";

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private apiService: ApiService) {  }

  signUp(name: string, email: string, password: string) {
    return this.apiService.postUser(name, email, password);
  }
}
