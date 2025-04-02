import { TuiButton, TuiIcon, TuiRoot, TuiDropdown, TuiDataList } from "@taiga-ui/core";
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {TuiAvatar, TuiChevron} from '@taiga-ui/kit';
import {TuiActiveZone, TuiObscured} from '@taiga-ui/cdk';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, TuiRoot,TuiIcon, TuiButton, TuiAvatar, TuiChevron, TuiDropdown,TuiActiveZone, TuiObscured,TuiDataList],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce';

  isCollapsed = false;
  username = 'Admin';

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  protected open = false;
	 
  protected onClick(): void {
      this.open = !this.open;
  }

  protected onObscured(obscured: boolean): void {
      if (obscured) {
          this.open = false;
      }
  }

  protected onActiveZone(active: boolean): void {
      this.open = active && this.open;
  }

  navigateToProfile(){
    
  }
}
