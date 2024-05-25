import { inject } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";


export default class BaseFormComponent {

  protected form!: FormGroup;

  protected toastrService = inject(ToastrService);

  protected router = inject(Router);

  protected getControlError(field: string) {
      let errors: ValidationErrors  = [];
      if (field.includes('.')) {
        const fields = field.split('.');
        let control: AbstractControl | FormGroup | null = null;

        for (let i = 0 ; i < fields.length ; i += 2) {
          control = this.form.get(fields[0])?.get(fields[1])!;
        }

        errors = control?.errors ?? [];
      } else {
        errors = this.form.get(field)?.errors ?? [];
      }

      if (Object.hasOwn(errors, 'required')) {
        return 'O campo é obrigatório';
      } else if (Object.hasOwn(errors, 'minlength')) {
        const minLength = errors['minlength'];
        return `O campo deve ter no mínimo ${minLength.requiredLength} caracteres`;
      } else if (Object.hasOwn(errors, 'maxlength')) {
        const maxLength = errors['maxlength'];
        return `O campo deve ter no máximo ${maxLength.requiredLength} atual ${maxLength.actualLength}`;
      } else if (Object.hasOwn(errors, 'email')) {
        return 'O campo não é um e-mail válido';
      } else if (Object.hasOwn(errors, 'passwordMatch')) {
        return 'A senha não bate com a senha de confirmação';
      } else if (Object.hasOwn(errors, 'min')) {
        const min = errors['min'];
        return `O mínimo é ${min.min}`;
      } else if (Object.hasOwn(errors, 'presentOrFuture')) {
        return 'A data deve estar no futuro';
      }
      return "";
    }

  public checkForm() {
    this.form.markAsDirty();
    this.markAllAsDirty(this.form);
  }

  private markAllAsDirty(obj: FormControl | FormGroup) {
    if (obj instanceof FormControl) {
      obj.markAsDirty();
    } else {
      const controls = obj.controls;
      for (const controlName in controls) {
        const control = controls[controlName];
        if (control instanceof FormControl) {
          control.markAsDirty();
          control.markAsPristine();
          control.markAsTouched();
        } else if (control instanceof FormGroup) {
          this.markAllAsDirty(control);
        }
      }
    }
  }
}
