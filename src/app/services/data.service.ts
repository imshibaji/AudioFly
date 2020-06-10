import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data = new BehaviorSubject<any>({
      id: '',
      label: '',
      url: '',
      author: '',
      img: ''
  });
  private index = new Subject<number>();

  constructor() { }

  add(data, index){
    this.data.next(data);
    this.addIndex(index);
  }

  addIndex(index){
    this.index.next(index);
  }

  get(){
    return this.data;
  }
  getIndex(){
    return this.index;
  }
}
