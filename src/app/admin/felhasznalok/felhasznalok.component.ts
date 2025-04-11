import { Component } from '@angular/core';
import { PageUser, UserControllerService } from '../../api';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiTablePagination } from '@taiga-ui/addon-table';
import type { TuiTablePaginationEvent } from '@taiga-ui/addon-table';
import { TuiIcon, TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiSearch } from '@taiga-ui/layout';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {TuiItemsWithMore} from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-felhasznalok',
  imports: [TuiTable, TuiTablePagination, TuiIcon, TuiSearch, ReactiveFormsModule, TuiItemsWithMore, TuiTextfield, CommonModule, TuiButton],
  templateUrl: './felhasznalok.component.html',
  styleUrl: './felhasznalok.component.css',
})
export class FelhasznalokComponent {
  users?: PageUser;
  totalRecords: number = 0;
  page: number = 0;
  size: number = 10;
  form: FormGroup;

  constructor(private userController: UserControllerService) {
    const filtersArray = new FormArray([
      new FormGroup({
        name: new FormControl('Név'),
        value: new FormControl('')
      })
    ]);
    this.form = new FormGroup({ filters: filtersArray });
  }

  get filters(): FormArray {
    return this.form.get('filters') as FormArray;
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
}
