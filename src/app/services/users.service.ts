import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersResult } from "../interfaces/users";
import { API_URL } from "../interfaces/constants";
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  getUsers(): Observable<UsersResult>{
    return this.http.get<UsersResult>(API_URL+'users');
  }
}
