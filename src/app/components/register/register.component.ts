import { Component,OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isBusiness: boolean = false;
  isTermsChecked: boolean;
  isPasswordHide: boolean;
  isPasswordConfirmHide: boolean;

  constructor(
    private _builder: FormBuilder,
    private _authService: AuthService,
    private _snackBar: SnackBarService,
    private router: Router
  ) {
    this.isBusiness = false
    this.isTermsChecked = false;
    this.isPasswordHide = true;
    this.isPasswordConfirmHide = true;
  }

  ngOnInit(): void {
    
  }

  checkTerm(event: MatCheckboxChange) {
    this.isTermsChecked = !this.isTermsChecked;
  }
  onToggleChange(event: MatSlideToggleChange) {
    this.isBusiness = !this.isBusiness;
  }

  registerform = this._builder.group({
    name: this._builder.control('', Validators.required),
    lastname: this._builder.control('', Validators.required),
    DNI: this._builder.control('', Validators.required),
    phone: this._builder.control('', Validators.required),
    email: this._builder.control('', Validators.required),
    password: this._builder.control('', Validators.required)
  });

  register() {
    let user: any;
  
    user = {
      name: this.registerform.value.name,
      lastname: this.registerform.value.lastname,
      DNI: this.registerform.value.email,
      phone: this.registerform.value.password,
      email: this.registerform.value.password,   
      password: this.registerform.value.password,
    };

    this._authService.register(user);
  }
  
  ingresar() {
    this.router.navigateByUrl('/login');
  }
  
}
