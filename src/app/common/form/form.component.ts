import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { TuiIcon, TuiTextfield, TuiButton } from '@taiga-ui/core';
import { TuiPassword } from '@taiga-ui/kit';
import { TuiInputModule } from '@taiga-ui/legacy';
import { CommonModule } from '@angular/common';

export interface Field{
  label: string
  name: string
  type: string
  placeholder: string
}

@Component({
  selector: 'app-form',
  imports: [TuiIcon, TuiTextfield, TuiPassword, TuiButton, TuiInputModule, CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})

export class FormComponent {
  @Input() fields: Field[] = []; // A form mezők konfigurációja
  @Input() form!: FormGroup;                   // Kívülről átadott FormGroup
  @Input() submitButtonName?: string;
  @Output() submitForm = new EventEmitter<any>();
  @Input() showSubmitBtn: boolean = true;

  // Az űrlap elküldése
  onSubmit(): void {
    this.submitForm.emit(this.form);
  }

  hasBackendError(fieldName: string): boolean {
    return this.form.get(fieldName)?.hasError('backend') ?? false;
  }

  getBackendError(fieldName: string): string {
    return this.form.get(fieldName)?.getError('backend') ?? '';
  }
}
