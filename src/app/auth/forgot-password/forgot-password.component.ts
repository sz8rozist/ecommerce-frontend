import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormComponent } from '../../common/form/form.component';
import { UserControllerService } from '../../api';

@Component({
  selector: 'app-forgot-password',
  imports: [FormComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private userController: UserControllerService) {}

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
    this.userController.forgotPassword(formGroup.get("email")?.value)
  }
}
