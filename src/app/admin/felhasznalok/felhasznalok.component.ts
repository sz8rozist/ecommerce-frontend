import { Component, Inject } from '@angular/core';
import { PageUser, UserControllerService } from '../../api';
import type { TuiTablePaginationEvent } from '@taiga-ui/addon-table';
import { TableComponent } from '../../common/table/table.component';
import { TuiAlertService, TuiLoader,  } from '@taiga-ui/core';
import { HttpResponse } from '@angular/common/http';
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

  constructor(private userController: UserControllerService,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService
  ) {
   
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

  onDelete(userId: number){
    this.loading = true;
    this.userController.deleteUser(userId, 'response').subscribe(
      (response: HttpResponse<any>) => {
        if (response.status === 204) {
          // A törlés sikeres volt, nem kell adatokat frissíteni
          this.loadUsers();
          this.alerts
          .open('Sikeres törlés!', {appearance: "positive"})
          .subscribe();
        }
        this.loading = false;
      },
      (error) => {
        console.error('Hiba történt a felhasználó törlése közben:', error);
        this.loading = false;
      }
    )
  }
}
