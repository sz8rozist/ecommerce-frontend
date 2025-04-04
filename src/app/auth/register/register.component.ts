import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TuiButton } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/legacy';
import { RouterModule } from '@angular/router';
import { SignupRequest, UserControllerService } from '../../api';
import { TuiIcon, TuiTextfield } from '@taiga-ui/core';
import { TuiPassword } from '@taiga-ui/kit';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    TuiInputModule,
    ReactiveFormsModule,
    TuiButton,
    RouterModule,
    TuiIcon,
    TuiPassword,
    TuiTextfield,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(private userController: UserControllerService) {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          '(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).*'
        ),
      ]),
    });
  }

  ngOnInit(): void {}

  onRegister() {
    if (this.form.valid) {
      const request = {
        username: this.form.get('username')?.value,
        password: this.form.get('password')?.value,
        email: this.form.get('email')?.value,
        role: 'teszt',
      };
      this.userController.signup(request).subscribe({
        next: (user) => {
          console.log('Felhasználó regisztrált', user);
          // Itt például átirányíthatod a felhasználót a főoldalra vagy másik oldalra
        },
        error: (err) => {
          console.error('Hiba történt a regisztrációkor:', err);
          if (err.error?.errors) {
            const backendErrors = err.error.errors;
            console.log(backendErrors);
            Object.keys(backendErrors).forEach((field) => {
              const control = this.form.get(field);
              if (control) {
                control.setErrors({ backend: backendErrors[field] });
              }
            });
          }
        },
      });
    } else {
      console.log('Az űrlap érvénytelen.');
    }
  }
}
