import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import { AuthGuard } from './auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router,private authGuard: AuthGuard) { }

  login(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor, complete todos los campos.';
      return;
    }

    this.authService.login(this.username, this.password).subscribe(
      response => {
        if (this.authGuard.canActivate()) {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/login']);
        }
      },
      error => {
        if (error.status === 403) {
          Swal.fire({
            icon: 'error',
            title: 'Error de inicio de sesión',
            text: 'Nombre de usuario o contraseña incorrectos.'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error de inicio de sesión',
            text: 'Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo más tarde.'
          });
        }
      }
    );
  }
}