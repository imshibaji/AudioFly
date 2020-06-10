import { Component, OnInit } from '@angular/core';
import { SongsQuery } from 'src/app/playlist/state/songs.query';
import { SongsService } from 'src/app/playlist/state/songs.service';
import { DataService } from 'src/app/services/data.service';
import { StreamState, AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-que-bar',
  templateUrl: './que-bar.component.html',
  styleUrls: ['./que-bar.component.scss']
})
export class QueBarComponent implements OnInit {
  files: Array<any> = [];
  currentIndex: number = 0;

  constructor(
    private _data: DataService,
    private songs: SongsQuery,
    private songsService: SongsService
  ) { }

  ngOnInit(): void {
    this.songs.selectAll().subscribe(files =>{
      this.files = files;
    });
    this._data.getIndex().subscribe(index => {
      this.currentIndex = index;
    })
  }

  playSong(data, index){
    // console.log(index); 
    this._data.add(data, index);
  }

  remove(song){
    this.songsService.remove(song.id);
  }
  clear(){
    this.songsService.removeAll();
  }
}
