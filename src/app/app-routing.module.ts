import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { Home1Component } from './components/home1/home1.component';
import { Home2Component } from './components/home2/home2.component';
import { Home3Component } from './components/home3/home3.component';
import { Home4Component } from './components/home4/home4.component';


const routes: Routes = [
  {path: '', redirectTo:'/login', pathMatch:'full'},
  {path: 'home1', component:Home1Component},
  {path: 'home2', component:Home2Component},
  {path: 'home3', component:Home3Component},
  {path: 'home4', component:Home4Component},
  {path: 'login', component:LoginComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
