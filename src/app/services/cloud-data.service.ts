import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CloudDataService {
  dataList: any;

  constructor(private http: HttpClient) { }

  get(){
    return this.http.get('./assets/cloud_songs_data.json');
  }
}
