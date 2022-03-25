import {Component, OnInit} from '@angular/core';
import {AccountService} from "../_services/account.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {canMigrateFile} from "@angular/core/schematics/utils/typescript/compiler_host";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../assets/css/style.css', '../../assets/css/icons.css',
    '../../assets/css/tailwind.css', '../../assets/css/uikit.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  registerForm: FormGroup;

  constructor(private accountService: AccountService, private toastr: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required,
        Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, this.matchValues('password')])
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: any) => {
      return control?.value === control?.parent?.controls[matchTo].value
        ? null : {isMatch: true}
    }
  }


  register() {
    console.log(this.registerForm.value);
    // this.accountService.register(this.model).subscribe(response => {
    //   this.router.navigateByUrl('/sidebar');
    // }, error => {
    //   this.toastr.error(error.error);
    // })
  }
}
