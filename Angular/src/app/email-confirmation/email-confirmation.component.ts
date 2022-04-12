import {Component, OnInit} from '@angular/core';
import {AccountService} from "../_services/account.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {
  public showSuccess: boolean;
  public showError: boolean;
  public errorMessage: string;

  constructor(private accountService: AccountService, private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.confirmEmail();
  }

  private confirmEmail = () => {
    this.showError = this.showSuccess = false;

    const token = this.router.snapshot.queryParams['token'];
    const email = this.router.snapshot.queryParams['email'];

    this.accountService.confirmEmail('api/email-confirmation',token, email).subscribe(() => {
        this.showSuccess = true;
      },
      error => {
        this.showError = true;
        this.errorMessage = error;
      })
  }

}
