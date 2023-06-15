import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersResult, User } from '../interfaces/users';
import { API_URL } from '../interfaces/constants';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public headers = new HttpHeaders();

  constructor(private httpClient: HttpClient) {
    this.headers = this.headers.append('app-id', '632ff2b33c1cc91cfa43d9b4');
  }

  getUsers(pageSize: number, pageLimit: number): Observable<UsersResult> {
    return this.httpClient.get<UsersResult>(
      API_URL + 'user?limit=' + pageLimit + '&page=' + pageSize,
      {
        headers: this.headers,
      }
    );
  }

  onCreateUser(user: any) {
    return this.httpClient.post<any>(API_URL + 'user/create', user, {
      headers: this.headers,
    });
  }

  onEditUser(id: string, user: any) {
    return this.httpClient.put<any>(API_URL + 'user/' + id, user, {
      headers: this.headers,
    });
  }
  getUserDetailById(id: string) {
    return this.httpClient.get<User>(API_URL + 'user/' + id, {
      headers: this.headers,
    });
  }

  onDeleteUser(id:string){
    return this.httpClient.delete(API_URL + 'user/' + id, {
      headers: this.headers,
    });
  }
}
