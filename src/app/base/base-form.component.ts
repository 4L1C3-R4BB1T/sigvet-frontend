import { FormGroup } from "@angular/forms";


export default class BaseFormComponent {

  protected form!: FormGroup;

  protected  getControlError(field: string) {
      const errors = this.form.get(field)?.errors!;
      console.log(errors)
      if (Object.hasOwn(errors, 'required')) {
        return 'O campo é obrigatório';
      } else if (Object.hasOwn(errors, 'minlength')) {
        const minLength = errors['minlength'];
        return `O campo deve ter no mínimo ${minLength.actualLength}/${minLength.requiredLength} caracteres`;
      }
      return "";
    }
}
