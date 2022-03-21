import {Component, OnInit} from '@angular/core';
import {AccountService} from "../_services/account.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../assets/css/style.css', '../../assets/css/icons.css',
    '../../assets/css/tailwind.css', '../../assets/css/uikit.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};

  constructor(private accountService: AccountService, private toastr: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  register() {
    this.accountService.register(this.model).subscribe(response => {
      this.router.navigateByUrl('/sidebar');
    }, error => {
      this.toastr.error(error.error);
    })
  }
}
