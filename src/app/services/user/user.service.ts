import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HttpUtil } from '../../util/http.util';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  basUrl = `${environment.URL_API}/users`;
  
  getListData(params:any) {
    const query = HttpUtil.getQueryStringFromObject(params);
    return this.http.get<any>(`${this.basUrl}${query}`);
  }

  getById(id:number) {
    return this.http.get<any>(`${this.basUrl}/${id}`);
  }

  saveUser(data:any) {
    return this.http.post<any>(`${this.basUrl}`, data);
  }

  updateUser(id:number, data:any) {
    return this.http.put<any>(`${this.basUrl}/${id}`, data);
  }

  deleteUser(id:number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'text/plain, */*',
        'Content-Type': 'application/json' // We send JSON
      }),
      responseType: 'text' as 'json'  // We accept plain text as response.
    };
    return this.http.delete<any>(`${this.basUrl}/${id}`, httpOptions);
  }
}