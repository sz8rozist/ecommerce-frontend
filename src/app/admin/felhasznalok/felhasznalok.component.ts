import { Component } from '@angular/core';
import { PageUser, UserControllerService } from '../../api';
import {TuiTable} from '@taiga-ui/addon-table';
import { PageRequest } from '../../common/PageRequest';
import { TuiTablePagination } from '@taiga-ui/addon-table';
@Component({
  selector: 'app-felhasznalok',
  imports: [TuiTable,TuiTablePagination],
  templateUrl: './felhasznalok.component.html',
  styleUrl: './felhasznalok.component.css'
})
export class FelhasznalokComponent {
  users: PageUser[] = [];
  totalRecords: number = 0;
  pageable: PageRequest ={ page: 0, size: 2 };

  constructor(private userController: UserControllerService){}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userController.findAll(this.pageable.page, this.pageable.size).subscribe(
      (response: any) => {
        this.users = response.content;
        this.totalRecords = response.totalElements;
      },
      (error) => {
        console.error('Hiba történt a felhasználók lekérése közben:', error);
      }
    );
  }

  onPageChange(page: number): void {
    this.pageable.page = page - 1;  // A Taiga UI-nál az oldalszám 1-től kezdődik, de az API 0-tól
    this.loadUsers();
  }
}
