import { Component, Inject } from '@angular/core';
import { FormComponent } from '../../common/form/form.component';
import { FormGroup, FormControl } from '@angular/forms';
import { ResetPasswordRequest, UserControllerService } from '../../api';
import { handleBackendErrors } from '../../common/form-error-handler';
import { ActivatedRoute } from '@angular/router';
import { TuiAlertService } from '@taiga-ui/core';

@Component({
  selector: 'app-reset-password',
  imports: [FormComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  formFields = [
    {
      name: 'oldPassword',
      label: 'Régi jelszó',
      type: 'password',
      placeholder: 'Írja be a régi jelszavát',
    },
    {
      name: 'newPassword',
      label: 'Új jelszó',
      type: 'password',
      placeholder: 'Írja be az új jelszavát',
    },
    {
      name: 'newPasswordConfirm',
      label: 'Új jelszó mégegyszer',
      type: 'password',
      placeholder: 'Írja be az új jelszavát mégegyszer',
    },
  ];

  forgotPwForm!: FormGroup;

  token: any;

  constructor(
    private userController: UserControllerService,
    private activetedRoute: ActivatedRoute,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService
  ) {}

  ngOnInit(): void {
    this.forgotPwForm = new FormGroup({
      oldPassword: new FormControl(''),
      newPassword: new FormControl(''),
      newPasswordConfirm: new FormControl(''),
    });

    // Token lekérése az URL-ből
    this.token = this.activetedRoute.snapshot.paramMap.get('token');
  }

  onResetPassword(form: FormGroup) {
    const request: ResetPasswordRequest = {
      newPassword: form.get('newPassword')?.value,
      oldPassword: form.get('oldPassword')?.value,
      newPasswordConfirm: form.get('newPasswordConfirm')?.value,
      token: this.token
    };
    this.userController.resetPassword(request).subscribe({
      next: () => {
        console.log('Jelszó visszaállítás sikeres');
        this.alerts
        .open('Sikeres email küldés!', {appearance: "positive"})
        .subscribe();
      },
      error: (err) => {
        console.error('Hiba történt jelszó visszaállítás közben:', err);
        handleBackendErrors(err, form);
      },
    });
  }
}
