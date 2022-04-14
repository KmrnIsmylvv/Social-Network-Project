import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../_services/account.service";
import {ForgotPassword} from "../_models/forgot-password";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../../assets/css/style.css', '../../assets/css/icons.css',
    '../../assets/css/tailwind.css', '../../assets/css/uikit.css']
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPasswordForm: FormGroup;
  public successMessage: string;
  public errorMessage: string;
  public showSuccess: boolean;
  public showError: boolean;

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl("", [Validators.required])
    })
  }

  public validateControl = (controlName: string) => {
    return this.forgotPasswordForm.controls[controlName].invalid &&
      this.forgotPasswordForm.controls[controlName].touched;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.forgotPasswordForm.controls[controlName].hasError(errorName);
  }

  public forgotPassword = (forgotPasswordFormValue: any) => {
    this.showError = this.showSuccess = false;

    const forgotPass = {...forgotPasswordFormValue};
    const forgotPassDto: ForgotPassword = {
      email: forgotPass.email,
      clientUri: 'https://localhost:4200/reset-password'
    }

    this.accountService.forgotPassword('api/account/ForgotPassword', forgotPassDto)
      .subscribe(() => {
          this.showSuccess = true;
          this.successMessage = 'The link has been sent, please check your email to reset your password.'
        },
        error => {
          this.showError = true;
          this.errorMessage = error;
        })
  }

}
