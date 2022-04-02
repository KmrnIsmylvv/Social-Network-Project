import {Component, OnInit} from '@angular/core';
import {User} from "../../_models/user";
import {AdminService} from "../../_services/admin.service";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['../../../assets/css/style.css', '../../../assets/css/icons.css',
    '../../../assets/css/tailwind.css', '../../../assets/css/uikit.css']
})
export class UserManagementComponent implements OnInit {
  users: Partial<User[]>;

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe(users => {
      this.users = users;
    })
  }

}
