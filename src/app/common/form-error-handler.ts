import { FormGroup } from '@angular/forms';

export function handleBackendErrors(err: any, form: FormGroup) {
    if (err.error?.errors) {
      const backendErrors = err.error.errors;
      Object.keys(backendErrors).forEach((field) => {
        const control = form.get(field);
        if (control) {
          control.setErrors({ backend: backendErrors[field] });
        }
      });
    }
  }