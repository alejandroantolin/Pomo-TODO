import { Routes, RouterModule } from '@angular/router';
import { CountdownComponent } from './components/home/countdown/countdown.component';
import { LoginComponent } from './components/enter/login/login.component';
import { SigninComponent } from './components/enter/signin/signin.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login',  component: LoginComponent},
  { path: 'signin',  component: SigninComponent},
  { path: 'countdown',  component: CountdownComponent},
];

export const appRoutingProviders: any[] = [];
export const routing = RouterModule.forRoot(appRoutes);

