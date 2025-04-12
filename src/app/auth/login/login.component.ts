import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { TuiButton } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/legacy';
import { RouterModule } from '@angular/router';
import { JwtTokenResponse, SigninRequest, UserControllerService } from '../../api';
import { handleBackendErrors } from '../../common/form-error-handler';
import { AuthServiceService } from '../auth-service.service';
import { FormComponent } from '../../common/form/form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    RouterModule,
    TuiButton,
    FormComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  
  formFields = [
    { name: 'username', label: 'Felhasználónév', type: 'text', placeholder: 'Írja be a felhasználó nevét', required: true },
    { name: 'password', label: 'Jelszó', type: 'password', placeholder: 'Írja be a jelszavát', required: true }
  ];
  form: FormGroup;

  constructor(
    private userController: UserControllerService,
    private authService: AuthServiceService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      username: ['', ],
      password: ['',]
    });
  }

  ngOnInit(): void {}

  onLogin(form: FormGroup) {
    console.log(form);
    const request: SigninRequest = {
      username: form.get('username')?.value,
      password: form.get('password')?.value,
    };
    this.userController.signin(request).subscribe({
      next: (token: JwtTokenResponse) => {
        console.log('Felhasználó bejelentkezett');
        if(token.token){
          this.authService.saveToken(token.token);
          this.authService.redirectBasedOnRole();
        }
      },
      error: (err) => {
        console.error('Hiba történt a bejelentkezéskor:', err);
        handleBackendErrors(err, form);
      },
    });
  }

  onForgotPassword(event: Event) {
    event.preventDefault();
    console.log('Jelszó-emlékeztető kérése indítva.');
    // Itt lehetne további logikát hozzáadni, például egy szolgáltatás hívását
  }
}
