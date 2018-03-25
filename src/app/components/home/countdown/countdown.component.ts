import {Component, OnInit,  ElementRef, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {SocketIoService, UsersData} from '../../../services/socketIo.service';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/take';

import { User } from '../../../models/user';

@Component({
  templateUrl: 'countdown.component.html'
})

export class CountdownComponent implements OnInit {
  countDown;
  count = 1500;
  message;

  columnsToDisplay  = ['username', 'status'];
  usersData =  this._socketIoService.usersData;
  dataSource: ExampleDataSource | null;

  constructor(private _socketIoService: SocketIoService) {
    // Consume events
    this._socketIoService.consumeEvenOnUserLoged();
  }

  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
    /* Inicializamos el contador*/
    this.message = this.dhms(this.count);
    /* Rellenamos la tabla*/
    this.dataSource = new ExampleDataSource(this.usersData);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  dhms(t) {
    let hours, minutes, seconds;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;

    return [
      hours + 'h',
      minutes + 'm',
      seconds + 's'
    ].join(' ');
  }

  onSubmit(): any {
    this.countDown = Observable.timer(0, 1000)
      .map(() => {
        this.message = this.dhms(--this.count);
      });
    this.countDown.subscribe();

  }
}

/*Data source*/
export class ExampleDataSource extends DataSource<any> {

  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  constructor(private _usersData: UsersData) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<User[]> {
    const displayDataChanges = [
      this._usersData.dataChange,
      this._filterChange,
    ];
    return Observable.merge(...displayDataChanges).map(() => {
      return this._usersData.data.slice().filter((item: User) => {
        const searchStr = (item.username).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });
    });
  }

  disconnect() {}
}
