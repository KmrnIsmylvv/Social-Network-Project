import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {AccountService} from "../_services/account.service";
import {ActivatedRoute} from "@angular/router";
import {ResetPassword} from "../_models/reset-password";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../../assets/css/style.css', '../../assets/css/icons.css',
    '../../assets/css/tailwind.css', '../../assets/css/uikit.css']
})
export class ResetPasswordComponent implements OnInit {
  public resetPasswordForm: FormGroup;
  public showSuccess: boolean;
  public showError: boolean;
  public errorMessage: string;

  private _token: string;
  private _email: string;

  constructor(private accountService: AccountService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl(''),
      confirm: new FormControl('', [Validators.required, this.matchValues('password')])
    });

    this._token = this.route.snapshot.queryParams['token'];
    this._email = this.route.snapshot.queryParams['email'];
  }

  public validateControl = (controlName: string) => {
    return this.resetPasswordForm.controls[controlName].invalid && this.resetPasswordForm.controls[controlName].touched;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.resetPasswordForm.controls[controlName].hasError(errorName);
  }

  public resetPassword = (resetPasswordFormValue: any) => {
    this.showError = this.showSuccess = false;

    const resetPass = {...resetPasswordFormValue};
    const resetPassword: ResetPassword = {
      password: resetPass.password,
      confirmPassword: resetPass.confirm,
      token: this._token,
      email: this._email
    }

    this.accountService.resetPassword('api/account/ResetPassword', resetPassword).subscribe(() => {
        this.showSuccess = true
      },
      error => {
        this.showError = true;
        this.errorMessage = error;
      })
  }


  matchValues(matchTo: string): ValidatorFn {
    return (control: any) => {
      return control?.value === control?.parent?.controls[matchTo].value
        ? null : {isMatch: true}
    }
  }

}
