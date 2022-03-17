import {Component, OnInit} from '@angular/core';
import {AccountService} from "../_services/account.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../assets/css/style.css', '../../assets/css/icons.css',
    '../../assets/css/tailwind.css', '../../assets/css/uikit.css']
})
export class RegisterComponent implements OnInit {
  // loginMode = false;

  model: any = {};

  constructor(private accountService: AccountService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  register() {
    this.accountService.register(this.model).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    })
  }
}
