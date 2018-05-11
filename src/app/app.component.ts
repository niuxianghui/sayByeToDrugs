import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('heroState', [
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active',   style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class AppComponent implements OnInit {
  sayByeTime = new Date('2018-5-8-22:00').getTime();

  distance: Date;
  day;
  hour;
  minute;
  second;
  ms;

  state = 'inactive';

  constructor() {
  }

  ngOnInit(): void {
    Observable.interval(1)
      .map(() => {
        const now = new Date();
        const time = now.getTime() - this.sayByeTime;
        return time;
      })
      .subscribe(time => {
        const nTime = time / 1000;
        this.day = Math.floor(nTime / 86400);
        this.hour = Math.floor(nTime % 86400 / 3600);
        this.minute = Math.floor(nTime % 86400 % 3600 / 60);
        const second = Math.floor(nTime % 86400 % 3600 % 60);
        if (second !== this.second) {
          this.toggleState();
        }
        this.second = second;
        this.ms = Math.floor(time % 1000);
      });
  }

  toggleState() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }
}
