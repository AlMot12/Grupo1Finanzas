import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { Home1Component } from './components/home1/home1.component'


const routes: Routes = [
  {path: '', redirectTo:'/login', pathMatch:'full'},
  {path: '/home1', component:Home1Component},
  {path: '/login', component:LoginComponent},
  {path: '/register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
