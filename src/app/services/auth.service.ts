import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClienteService } from './cliente.service';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  loggedCliente: any = null;

  constructor(
    private _clienteService: ClienteService,
    private _router: Router,
    private _snackBar: SnackBarService
  ) {
    const storedCliente = localStorage.getItem('loggedCliente');
    if (storedCliente) {
      this.isLoggedIn = true;
      this.loggedCliente = JSON.parse(storedCliente);
    }
  }

  register(cliente: any): void {
    this._clienteService.checkUserExists(cliente.email).subscribe({
      next: (clienteExists) => {
        if (clienteExists) {
          this._snackBar.openSnackBar(
            'Ya existe una cuenta registrada con este correo.'
          );
          return;
        } else if (!clienteExists) {
          this._clienteService.signup(cliente).subscribe({
            next: (res) => {
              this._snackBar.openSnackBar('Registro exitoso!');
              this._router.navigate(['/login']);
            },
            error: (error) => { this._snackBar.openSnackBar(error.errror.message); },
          });
        } else if (clienteExists == null) {
          this._snackBar.openSnackBar(
            'Hay un problema con el servidor. Intente más tarde.'
          );
          return;
        }
      },
      error: (error) => { this._snackBar.openSnackBar(error.errror.message); },
    });
  }

  login(credentials: any): void {
    this._clienteService.checkUserExists(credentials.email).subscribe({
      next: (clienteExists) => {
        if (clienteExists) {
          this._clienteService.login(credentials).subscribe({
            next: (res) => {
              if (res.length < 1) {
                this._snackBar.openSnackBar(
                  'Correo electrónico o contraseña incorrecta.'
                );
                return;
              }
              this.isLoggedIn = true;
              this.loggedCliente = {
                id: res[0].id,
                name: res[0].name,
                lastname: res[0].lastname,
              };
              localStorage.setItem('loggedCliente', JSON.stringify(this.loggedCliente));
              this._snackBar.openSnackBar('Inicio de sesión exitoso!');
              this._router.navigate(['/menu']);
            },
            error: (error) => this._snackBar.openSnackBar(error.errror.message),
          });
        }
        else if (!clienteExists) {
          this._snackBar.openSnackBar(
            'Hay un problema con el servidor. Intente más tarde.'
          );
        } else if (clienteExists == null) {
          this._snackBar.openSnackBar(
            'Hay un problema con el servidor. Intente más tarde.'
          );
          return;
        }
      },
      error: (error) => this._snackBar.openSnackBar(error.errror.message),
      // Handle error
    });
  }

  logout(): void {
    this.isLoggedIn = false;
    this.loggedCliente = null;
    localStorage.removeItem('loggedCliente');
    this._router.navigate(['/login']);
  }

  canActivate(): boolean {
    if (this.isLoggedIn || this.loggedCliente) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }

  getLoggedCliente() {
    return this.loggedCliente;
  }
}