import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  getAlbums(){
    return this.http.get('https://jsonplaceholder.typicode.com/albums');
  }

  getQuestion(){
    return this.http.get('./app/world-110m.json');
  }

}
