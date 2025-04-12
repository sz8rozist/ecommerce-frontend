import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormComponent } from '../../common/form/form.component';
import { handleBackendErrors } from '../../common/form-error-handler';
import { UserControllerService } from '../../api/api/userController.service';
import { TuiAlertService } from '@taiga-ui/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  imports: [FormComponent, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent implements OnInit {
  constructor(private userController: UserControllerService, @Inject(TuiAlertService) private readonly alerts: TuiAlertService) {}

  formFields = [
    {
      name: 'email',
      label: 'Email cím',
      type: 'text',
      placeholder: 'Írja be az email címét',
      required: true,
    },
  ];

  forgotPwForm!: FormGroup;

  ngOnInit(): void {
    this.forgotPwForm = new FormGroup({
      email: new FormControl(''),
    });
  }

  sendEmailForForgotPassowrd(formGroup: FormGroup) {
    console.log(formGroup)
    this.userController.forgotPassword(formGroup.get("email")?.value).subscribe({
       next: () => {
              console.log('Elfelejtett jelszó küldés sikeres');
              this.alerts
              .open('Sikeres email küldés!', {appearance: "positive"})
              .subscribe();
            },
            error: (err) => {
              console.error('Hiba történt az elfelejtett jelszó közben:', err);
              handleBackendErrors(err, formGroup);
            },
    })
  }
}
