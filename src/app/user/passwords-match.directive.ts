import { Directive, Input, OnDestroy, } from '@angular/core';
import { AbstractControl, NgForm,  NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[ngModel][appPasswordsMatch]',
  providers:[

    {
      provide: NG_VALIDATORS,
      useExisting: PasswordsMatchDirective,
      multi: true
    }

  ]
})
export class PasswordsMatchDirective implements Validator, OnDestroy {

  @Input() appPasswordsMatch = "";
  @Input() name!: string;
  otherControl!: AbstractControl;
  subscription!: Subscription

  constructor(
    private form: NgForm) {}

  validate(control: AbstractControl): ValidationErrors | null {
    const otherControl = this.form.controls[this.appPasswordsMatch];
    if (this.subscription) { this.subscription.unsubscribe(); }
    this.subscription = otherControl.valueChanges!.subscribe(() => {
      control.updateValueAndValidity({ onlySelf: true })
    })

    return control.value !== otherControl?.value ? {
      passwordsMatch: {
        [this.appPasswordsMatch]: otherControl?.value,
        [this.name]: control.value
      }
    } :null
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
