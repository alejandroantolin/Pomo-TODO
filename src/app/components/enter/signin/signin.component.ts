import {Component, OnInit, Inject} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {MAT_SNACK_BAR_DATA} from '@angular/material';

import {UserService} from '../../../services/user.service';
import {CountdownService} from '../../../services/countdown.service';

import {User} from '../../../models/user';

import {MatSnackBar} from '@angular/material';

declare var jquery: any;
declare var $: any;

@Component({
  templateUrl: 'signin.component.html'
})

export class SigninComponent implements OnInit {
  private static CLASS_NAME_FIELD_FLOAT = 'field--show-floating-label';
  user: User;

  constructor(public snackBar: MatSnackBar, private _countdownService: CountdownService,
              private _userService: UserService) { }

  ngOnInit() {
    this.user = new User();
    // checkMongoConnection
    this._countdownService
      .checkMongoConnection()
      .subscribe(res => {
        if (res && res.status === 200) {
          // Output - 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
          const mongoStatus = res.payload.mongoStatus;
          switch (res.payload.mongoStatus){
            case 0:
            case 3:
              this.snackBar.openFromComponent(SignInSnackComponent,  {
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

  _onInputChange(e): any {
    if (e) {
      const wrapper = $(e.srcElement).closest('.field');
      const value = e.target.value;
      if (!value || value === '') {
        $(wrapper).removeClass(SigninComponent.CLASS_NAME_FIELD_FLOAT);
      } else {
        $(wrapper).addClass(SigninComponent.CLASS_NAME_FIELD_FLOAT);
      }
    }
  }

  onSubmit() {
    this._userService
      .register(this.user)
      .subscribe(res => {
        console.log(res);
        if (res && res.status === 201 || res.status === 200) {
          this.snackBar.openFromComponent(SignInSnackComponent,  {
            data: `Usuario ${this.user.username} creado correctamente.`,
            duration: 3000,
            extraClasses: [`success`]
          });
        }else if (!res || res.status === 500) {
          this.snackBar.openFromComponent(SignInSnackComponent,  {
            data: 'Error al registrar el usuario.',
            duration: 3000,
            extraClasses: [`error`]
          });
        }
      });
  }
}


@Component({
  template: '<span>{{data}}</span>'
})

export class SignInSnackComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}


