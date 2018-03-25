import { NgModule } from '@angular/core';
import {MatIconModule, MatButtonModule, MatMenuModule, MatProgressSpinnerModule, MatTooltipModule} from '@angular/material';
import {MatToolbarModule, MatSnackBarModule, MatCheckboxModule, MatTableModule} from '@angular/material';

import { LoginSnackComponent } from './components/enter/login/login.component';
import { SignInSnackComponent } from './components/enter/signin/signin.component';


@NgModule({
  imports: [
    MatTableModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTooltipModule],
  exports: [
    MatTableModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTooltipModule],
  declarations: [ LoginSnackComponent, SignInSnackComponent ],
  entryComponents: [LoginSnackComponent, SignInSnackComponent]
})

export class MaterialModule { }
