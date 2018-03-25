import {Component, OnInit, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {MAT_SNACK_BAR_DATA} from '@angular/material';

import {UserService} from '../../../services/user.service';
import {CountdownService} from '../../../services/countdown.service';
import {SocketIoService} from '../../../services/socketIo.service';

import {User} from '../../../models/user';

import {MatSnackBar} from '@angular/material';

declare var jquery: any;
declare var $: any;

@Component({
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  private static CLASS_NAME_FIELD_FLOAT = 'field--show-floating-label';
  user: User;

  constructor(public snackBar: MatSnackBar, private _countdownService: CountdownService,
              private _userService: UserService, private _socketIoService: SocketIoService,
              private _router: Router) { }

  _onInputChange(e): any {
    if (e) {
      const wrapper = $(e.srcElement).closest('.field');
      const value = e.target.value;
      if (!value || value === '') {
        $(wrapper).removeClass(LoginComponent.CLASS_NAME_FIELD_FLOAT);
      } else {
        $(wrapper).addClass(LoginComponent.CLASS_NAME_FIELD_FLOAT);
      }
    }
  }

  ngOnInit() {
    this.user = new User();
    // checkMongoConnection
    this._countdownService
      .checkMongoConnection()
      .subscribe(res => {
        if (res && res.status === 200) {
          // Output - 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
          const mongoStatus = res.payload.mongoStatus;
          switch (mongoStatus) {
            case 0:
            case 3:
              this.snackBar.openFromComponent(LoginSnackComponent,  {
                data: 'Error en la conexión a la base de datos.',
                extraClasses: [`error`]
              });
              // Disable login
              $('#sign_submit').attr('disabledByConnection', 'disabledByConnection');
              break;
          }
        }
      });
  }

  onSubmit() {
    this._userService
      .login(this.user)
      .subscribe(res => {
        if (res && res.status === 200) {
          console.log('Usuario logeado en FRONT!');
          // Emito evento a SocketIO
          this._socketIoService.emitEventOnUserLoged(this.user);

          this._router.navigate(['/countdown']);
          this.snackBar.dismiss();
        }else {
          this.snackBar.openFromComponent(LoginSnackComponent,  {
            data: 'Usuario o contraseña incorrectos',
            duration: 3000,
            extraClasses: [`error`]
          });
        }
      });
  }


  toggleCheck() {
    if ( $('#username').attr('autocomplete') === 'off' ) {
      $('#username').attr('autocomplete', 'on');
    }else {
      $('#username').attr('autocomplete', 'off');
    }
  }
}

@Component({
  template: '<span>{{data}}</span>'
})

export class LoginSnackComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}

}

