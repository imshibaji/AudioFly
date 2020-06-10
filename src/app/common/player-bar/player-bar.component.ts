import { createSong } from 'src/app/playlist/state/song.model';
import { SongsService } from 'src/app/playlist/state/songs.service';
import { DataService } from './../../services/data.service';
import { Component, OnInit} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SongsQuery } from 'src/app/playlist/state/songs.query';
import * as moment from "moment";
import { takeUntil } from 'rxjs/operators';



@Component({
  selector: 'app-player-bar',
  templateUrl: './player-bar.component.html',
  styleUrls: ['./player-bar.component.scss']
})
export class PlayerBarComponent implements OnInit {
  audio: any;
  index: any = 0;
  allSongs: any;

  // Song Play data
  readDuration='00:00:00';
  readCurrentTime='00:00:00';
  currentTime = 0;
  duration = 100;

  mydata: any;
  isPlay = false;
  valume = 0.5;
  audioEvents = [
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart"
  ];
  stop$ = new Subject();

  constructor(
    private _data: DataService, 
    private songs: SongsQuery,
    private songsService: SongsService
  ) { 
    this.audio = new Audio();
  }
  ngOnInit(): void {
    this._data.get().subscribe(data => {
      // console.log(data);
      
      this.mydata = data; // Song Info Data
      this.stop(); // Remove Previous Instance
    });
    this._data.getIndex().subscribe(index => {
      this.index = index;
      this.mydata = this.allSongs[this.index];
      this.loadData(this.mydata);
      this.setSeek(this.mydata.currentTime || 0);
    });
    this.songs.selectAll().subscribe(songs =>{
      this.allSongs = songs;
      // console.log(this.allSongs);
    });
  }

  playTimeTracker(data, song){
    // console.log(data.id, data.label, song.currentTime);
    this.songsService.update(data.id, {currentTime: song.currentTime});
  }

  loadData(data){
    this.playStream(data.url).pipe(takeUntil(this.stop$)).subscribe((ev:Event) =>{
      // console.log(ev, this.currentTime);
      if(ev.type === 'timeupdate'){ 
        this.playTimeTracker(data, this); // Tracking Time 
      }
      if(ev.type === 'ended'){
        this.stop(); // Remove Previous Instance
        
        if(!this.isEnd()){ this.next(); }
      }
    });
    this.play();
  }

  playStream(data){
    return new Observable(observer =>{
      this.audio.src = data;
      this.audio.load();
      this.audio.play();
      this.setVolume(this.valume);

      const handle = (event: Event) =>{
        // console.log(event);
        switch (event.type) {
          case "canplay":
            this.duration = this.audio.duration;
            this.readDuration = this.formatTime(this.audio.duration);
            break;
          case "timeupdate":
            this.currentTime = this.audio.currentTime;
            this.readCurrentTime = this.formatTime(this.audio.currentTime);
            break;
        }
        observer.next(event);
      }

      this.addEvents(this.audio, this.audioEvents, handle);

      return ()=>{
        this.audio.pause();
        this.audio.currentTime = 0;
        this.removeEvents(this.audio, this.audioEvents, handle);
        this.resetStatus();
      }
    });
  }
  resetStatus(){
    this.readDuration='00:00:00';
    this.readCurrentTime='00:00:00';
    this.duration = 100;
    this.currentTime = 0;
    this.mydata = {};
    this.isPlay = false;
    // this.valume = 0.5;
  }

  private addEvents(obj, events, handler) {
    events.forEach(event => {
      obj.addEventListener(event, handler);
    });
  }

  private removeEvents(obj, events, handler) {
    events.forEach(event => {
      obj.removeEventListener(event, handler);
    });
  }

  formatTime(time: number, format: string = "HH:mm:ss") {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

  play(){
    if(this.mydata.label){
      this.audio.play();
      this.isPlay = true;
    }
    if(this.allSongs.length && !this.mydata.label){
      this.mydata = this.allSongs[this.index];
      this.loadData(this.mydata);
      this.setSeek(this.mydata.currentTime || 0);
    }
    // console.log(this.index);
  }

  pause(){
    this.audio.pause();
    this.isPlay = false;
  }

  stop(){
    this.stop$.next();
    this.stop$.subscribe();
    // this.songsService.update(this.mydata.id, {currentTime: 0}); // Not Use here
  }

  setVolume(val){
    this.valume = val;
    this.audio.volume = this.valume;
  }

  setSeek(val){
    this.audio.currentTime = val;
  }

  isEnd(){    
    return this.index === this.allSongs.length-1 || this.index === this.allSongs.length;
  }
  isStart(){
    return this.index === 0;
  }
  next(){
    const index = this.index + 1;
    this._data.addIndex(index); // After Adding This
    // this.loadData(this.mydata.url); // It's Not Reqired
    // this.mydata = this.allSongs[this.index];
    console.log(this.index);
  }
  previous(){
    const index = this.index - 1;
    this._data.addIndex(index); // After Adding This
    // this.loadData(this.mydata.url); // It's Not Reqired
    // this.mydata = this.allSongs[this.index];
    console.log(this.index);
  }

}
