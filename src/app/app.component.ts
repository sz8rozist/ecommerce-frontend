import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TuiRoot } from '@taiga-ui/core';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterModule, TuiRoot],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce';

  
}
