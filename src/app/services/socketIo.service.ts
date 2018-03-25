import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { User } from '../models/user';

import * as io from 'socket.io-client';

declare var jquery: any;
declare var $: any;

@Injectable()
export class SocketIoService {
  private socket: SocketIOClient.Socket;

  public usersData: UsersData;

  constructor() {
    this.socket = io('http://127.0.0.1:3000');
    console.log(this.socket);
    this.usersData = new UsersData();
  }

  // Emitir: usuario logeado
  emitEventOnUserLoged(user: User) {
    this.socket.emit('userLoged', user);
  }

  // Consumir: usuario logeado
  consumeEvenOnUserLoged() {
    this.socket.on('userLoged', (users) => {
      const usersConected: User[] = [];
      let currentUser: User;
      for (const user in users) {
        if (users.hasOwnProperty(user)) {
          currentUser = new User();
          currentUser.status = true;
          currentUser.username = users[user];
          usersConected.push(currentUser);
        }
      }
     this.usersData.addUsers(usersConected);
    });
  }
}


export class UsersData {
  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  get data(): User[] {
    return this.dataChange.value;
  }

  constructor() {}

  addUsers(users: User[]) {
    this.dataChange.next(users);
  }
}
