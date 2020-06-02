import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Song } from './song.model';

export interface SongsState extends EntityState<Song> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'songs' })
export class SongsStore extends EntityStore<SongsState> {

  constructor() {
    super();
  }

}
