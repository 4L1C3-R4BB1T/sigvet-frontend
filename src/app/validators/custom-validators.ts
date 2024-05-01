import { FormGroup, ValidatorFn } from "@angular/forms";

export const CustomValidators = {
  passwordMatch: (field: string, form: FormGroup): ValidatorFn => {
    return (control) => {
      if (form.controls[field]?.value !== control.value) {
        return {
          passwordMatch: false,
        };
      }
      return null;
    };
  }
}

