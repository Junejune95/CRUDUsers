import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersResult } from "../interfaces/users";
import { API_URL } from "../interfaces/constants";
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public headers = new HttpHeaders();

  constructor(private httpClient:HttpClient) { 
    this.headers=this.headers.append(
      'app-id','632ff2b33c1cc91cfa43d9b4'
    )
  }



  getUsers(): Observable<UsersResult>{
   
    return this.httpClient.get<UsersResult>(API_URL+'user',{
      headers:this.headers
    });
  }
}
