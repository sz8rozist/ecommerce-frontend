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
import { SigninRequest, UserControllerService } from '../../api';
import { handleBackendErrors } from '../../common/form-error-handler';
import { AuthServiceService } from '../auth-service.service';
import { TuiIcon, TuiTextfield } from '@taiga-ui/core';
import { TuiPassword } from '@taiga-ui/kit';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiButton,
    RouterModule,
    TuiIcon,
    TuiPassword,
    TuiTextfield,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private userController: UserControllerService,
    private authService: AuthServiceService
  ) {
    this.form = new FormGroup({
      username: new FormControl(null, []),
      password: new FormControl(null, []),
    });
  }

  ngOnInit(): void {}

  onLogin() {
    const request: SigninRequest = {
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value,
    };
    this.userController.signin(request).subscribe({
      next: () => {
        console.log('Felhasználó bejelentkezett');
        this.authService.redirectBasedOnRole();
      },
      error: (err) => {
        console.error('Hiba történt a bejelentkezéskor:', err);
        handleBackendErrors(err, this.form);
      },
    });
  }

  onForgotPassword(event: Event) {
    event.preventDefault();
    console.log('Jelszó-emlékeztető kérése indítva.');
    // Itt lehetne további logikát hozzáadni, például egy szolgáltatás hívását
  }
}
