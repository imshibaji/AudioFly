import { Observable } from 'rxjs';
import { CloudDataService } from './../../services/cloud-data.service';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { SongsService } from 'src/app/playlist/state/songs.service';
import { createSong } from 'src/app/playlist/state/song.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  musicLists: Observable<any>;

  constructor(
    private _data: DataService, 
    private cloud: CloudDataService,
    private songs:SongsService
  ) { }

  ngOnInit(): void {
    this.musicLists = this.cloud.get();
  }

  sendData(data){
    // this._data.add(data);
    this.songs.add(createSong(data));
  }

}
