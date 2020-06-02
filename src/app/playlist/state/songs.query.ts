import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { SongsStore, SongsState } from './songs.store';

@Injectable({ providedIn: 'root' })
export class SongsQuery extends QueryEntity<SongsState> {

  constructor(protected store: SongsStore) {
    super(store);
  }

}
