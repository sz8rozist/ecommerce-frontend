import { Component, OnInit, platformCore } from '@angular/core';
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
import { FormComponent } from '../../common/form/form.component';
import { handleBackendErrors } from '../../common/form-error-handler';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    TuiInputModule,
    ReactiveFormsModule,
    RouterModule,
    TuiButton,
    FormComponent,
    TuiTextfield,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  formFields = [
    { name: 'username', label: 'Felhasználónév', type: 'text', placeholder: 'Írja be a felhasználó nevét', required: true },
    { name: 'password', label: 'Jelszó', type: 'password', placeholder: 'Írja be a jelszavát', required: true },
    { name: 'email', label: 'E-mail', type: 'text', placeholder: 'Írja be az e-mail címét', required: true}
  ];
  constructor(private userController: UserControllerService) {
 
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onRegister(form: FormGroup) {
      const request: SignupRequest = {
        username: form.get('username')?.value,
        password: form.get('password')?.value,
        email: form.get('email')?.value,
        role: 'ADMIN',
      };
      this.userController.signup(request).subscribe({
        next: (user) => {
          console.log('Felhasználó regisztrált', user);
          // Itt például átirányíthatod a felhasználót a főoldalra vagy másik oldalra
        },
        error: (err) => {
          console.error('Hiba történt a regisztrációkor:', err);
          handleBackendErrors(err, form);
        },
      });
  }
}
