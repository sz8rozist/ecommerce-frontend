import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserControllerService } from '../api';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private userController: UserControllerService, private router: Router) {}

  redirectBasedOnRole() {
    this.userController.getLoggedUser().subscribe((user: any) => {
      console.log(user);
      
    });
  }
}
