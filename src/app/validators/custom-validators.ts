import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";
import moment from "moment";

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
  },
  presentOrFuture: (control: AbstractControl) => {
    try {
      const today = moment(new Date());
      const targetDate = moment(control.value);
      if (targetDate.isSameOrBefore(today)) {
        return {
          presentOrFuture: true,
        }
      }
      return null;
    } catch (ex: any) {}
    return null;
  },
}

