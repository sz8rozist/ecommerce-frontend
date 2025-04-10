import { Component } from '@angular/core';
import { PageUser, UserControllerService } from '../../api';
import {TuiTable} from '@taiga-ui/addon-table';
import { TuiTablePagination } from '@taiga-ui/addon-table';
import type { TuiTablePaginationEvent } from '@taiga-ui/addon-table';
@Component({
  selector: 'app-felhasznalok',
  imports: [TuiTable,TuiTablePagination],
  templateUrl: './felhasznalok.component.html',
  styleUrl: './felhasznalok.component.css',
})
export class FelhasznalokComponent {
  users?: PageUser;
  totalRecords: number = 0;
  page: number = 0;
  size: number = 10;
  constructor(private userController: UserControllerService){}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userController.findAll(this.page, this.size).subscribe(
      (response: any) => {
        this.users = response;
        this.totalRecords = response.totalElements;
      },
      (error) => {
        console.error('Hiba történt a felhasználók lekérése közben:', error);
      }
    );
  }

  onPageChange({ page, size }: TuiTablePaginationEvent): void {
    this.page = page;
    this.size = size;
    this.loadUsers();
  }
}
