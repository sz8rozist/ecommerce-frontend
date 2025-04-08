import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserControllerService } from '../api';
import { HttpContext } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private userController: UserControllerService, private router: Router) {}

  redirectBasedOnRole() {
    this.userController.getLoggedUser().subscribe({
      next: (user: User) => {
        console.log(user);
        if(user.roles?.some(role => role.name === 'ADMIN')){
          this.router.navigate(['/admin']);
        }else{
          this.router.navigate(["/shop"]);
        }
      },
      error: (err) => {
        console.log("hiba a get logged userbe", err);
        if (err.status === 401) {
          console.warn('Nincs bejelentkezett felhasználó');
          this.router.navigate(['/login']);
        }
      }
    });
  }
}
