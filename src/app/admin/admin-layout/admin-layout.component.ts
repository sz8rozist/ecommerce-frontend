import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { TuiActiveZone, TuiObscured } from '@taiga-ui/cdk';
import { TuiRoot, TuiIcon, TuiButton, TuiDropdown, TuiDataList, } from '@taiga-ui/core';
import { TuiAvatar, TuiChevron } from '@taiga-ui/kit';
@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, CommonModule, TuiRoot,TuiIcon, RouterModule, TuiButton, TuiAvatar, TuiChevron, TuiDropdown,TuiActiveZone, TuiObscured,TuiDataList, TuiDropdown],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  isCollapsed = false;
  username = 'Admin';
  dropdownOpen = false;

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

  navigateTo(hova: string){
    console.log("Navigate to: " + hova);
  }
}
