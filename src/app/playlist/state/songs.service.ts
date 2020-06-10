import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { Song } from './song.model';
import { SongsStore } from './songs.store';

@Injectable({ providedIn: 'root' })
export class SongsService {

  constructor(
    private songsStore: SongsStore,
    private http: HttpClient) {
  }


  get() {
    return this.http.get<Song[]>('https://api.com').pipe(tap(entities => {
      this.songsStore.set(entities);
    }));
  }

  add(song: Song) {
    this.songsStore.add(song);
  }

  update(id, song: Partial<Song>) {
    this.songsStore.update(id, song);
  }

  remove(id: ID) {    
    this.songsStore.remove(id);
  }

  removeAll(){
    this.songsStore.remove();
  }

}
