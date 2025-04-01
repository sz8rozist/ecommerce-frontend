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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiButton,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private userController: UserControllerService) {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
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
        // Itt például átirányíthatod a felhasználót a főoldalra vagy másik oldalra
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
