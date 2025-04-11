import { Component } from '@angular/core';
import { PageUser, UserControllerService } from '../../api';
import type { TuiTablePaginationEvent } from '@taiga-ui/addon-table';
import { TableComponent } from '../../common/table/table.component';

@Component({
  selector: 'app-felhasznalok',
  imports: [TableComponent],
  templateUrl: './felhasznalok.component.html',
  styleUrl: './felhasznalok.component.css',
})
export class FelhasznalokComponent {
  users?: PageUser;
  totalRecords: number = 0;
  page: number = 0;
  size: number = 10;

  constructor(private userController: UserControllerService) {
   
  }

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

  onSearch(search: string){

  }
}
