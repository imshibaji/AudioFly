import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {
  isComplete = false;

  constructor() { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.isComplete = true;
    },8000);
  }

}
