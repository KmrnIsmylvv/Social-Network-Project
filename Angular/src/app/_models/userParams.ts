import {User} from "./user";

export class UserParams {
  gender: string;
  minAge = 14;
  maxAge = 99;
  pageNumber = 1;
  pageSize = 5;
  orderBy = 'lastActive';

  constructor(user: User) {
  }
}
