import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import {
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';

import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { LoginComponent} from './components/enter/login/login.component';
import { SigninComponent} from './components/enter/signin/signin.component';
import { ToolbarComponent } from './components/home/toolbar/toolbar.component';
import {CountdownComponent} from './components/home/countdown/countdown.component';

import { CountdownService } from './services/countdown.service';
import { UserService } from './services/user.service';
import { SocketIoService, UsersData } from './services/socketIo.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing,
    BrowserAnimationsModule,
    MaterialModule],
  declarations: [ AppComponent, LoginComponent, SigninComponent, CountdownComponent, ToolbarComponent ],
  providers: [ appRoutingProviders, UserService, SocketIoService, CountdownService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class AppModule {
  constructor(private _socketIoService: SocketIoService) {
  }
}
