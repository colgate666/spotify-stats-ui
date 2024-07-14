import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ILoginRequest, ILoginResponse} from "../../types";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  login(data: ILoginRequest) {
    return this.http.post<ILoginResponse>(this.baseUrl, data);
  }
}
