import { Component } from '@angular/core';
import { PageUser, UserControllerService } from '../../api';
import type { TuiTablePaginationEvent } from '@taiga-ui/addon-table';
import { TableComponent } from '../../common/table/table.component';
import { TuiLoader,  } from '@taiga-ui/core';
@Component({
  selector: 'app-felhasznalok',
  imports: [TableComponent, TuiLoader],
  templateUrl: './felhasznalok.component.html',
  styleUrl: './felhasznalok.component.css',
})
export class FelhasznalokComponent {
  users?: PageUser;
  totalRecords: number = 0;
  page: number = 0;
  size: number = 10;
  loading: boolean = false;

  constructor(private userController: UserControllerService) {
   
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(search?: any): void {
    this.loading = true;
    this.userController.findAll(this.page, this.size, search ? search.username : undefined).subscribe(
      (response: any) => {
        this.users = response;
        this.totalRecords = response.totalElements;
        this.loading = false;
      },
      (error) => {
        console.error('Hiba történt a felhasználók lekérése közben:', error);
        this.loading = false;
      }
    );
  }

  onPageChange({ page, size }: TuiTablePaginationEvent): void {
    this.page = page;
    this.size = size;
    this.loadUsers();
  }

  onSearch(search: any){
    console.log(search);
    this.loadUsers(search);
  }
}
