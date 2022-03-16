import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../assets/css/style.css', '../../assets/css/icons.css',
    '../../assets/css/tailwind.css', '../../assets/css/uikit.css']
})
export class RegisterComponent implements OnInit {
  loginMode = false;

  model: any = {};

  constructor() {
  }

  ngOnInit(): void {
  }

  register(){
    console.log(this.model);
  }

  loginToggle() {
    this.loginMode = !this.loginMode;
  }

}
