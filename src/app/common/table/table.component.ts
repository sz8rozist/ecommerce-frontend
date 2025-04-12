import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { TuiTablePaginationEvent } from '@taiga-ui/addon-table';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiTablePagination } from '@taiga-ui/addon-table';
import { TuiIcon, TuiButton, TuiTextfield, TuiLoader } from '@taiga-ui/core';
import { TuiSearch } from '@taiga-ui/layout';
import { TuiItemsWithMore } from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';

export interface FilterConfig {
  name: string;
  label: string;
  placeholder?: string;
}

@Component({
  selector: 'app-table',
  imports: [
    TuiTable,
    TuiTablePagination,
    TuiIcon,
    TuiSearch,
    ReactiveFormsModule,
    TuiItemsWithMore,
    TuiTextfield,
    CommonModule,
    TuiButton,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  // Táblázat adatai és konfigurációja
  @Input() data: any[] = [];
  @Input() columns: Array<{ header: string; field: string }> = [];
  @Input() totalRecords: number = 0;
  @Input() page: number = 0;
  @Input() size: number = 10;
  @Input() filterConfigs: FilterConfig[] = [];

  // Események
  @Output() pageChange = new EventEmitter<TuiTablePaginationEvent>();
  @Output() search = new EventEmitter<any>();
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<any>();
  // Kereső form
  searchForm!: FormGroup;

  ngOnInit(): void {
    this.createSearchForm();
  }

  private createSearchForm(): void {
    // Ha nincs megadva filterConfigs, használjunk egy alapértelmezett filtert
    if (!this.filterConfigs || this.filterConfigs.length === 0) {
      this.filterConfigs = [{ name: 'default', label: 'Filter' }];
    }

    const formArray = new FormArray(
      this.filterConfigs.map(
        (config) =>
          new FormGroup({
            name: new FormControl(config.name),
            label: new FormControl(config.label),
            value: new FormControl(''),
          })
      )
    );
    this.searchForm = new FormGroup({ filters: formArray });
  }

  get filters(): FormArray {
    return this.searchForm.get('filters') as FormArray;
  }

  onSearch(): void {
    // Csak azokat a filtereket adjuk tovább, amelyeknél van érték
    const activeFilters = this.searchForm.value.filters.reduce(
      (acc: any, filter: any) => {
        if (filter.value) {
          acc[filter.name] = filter.value;
        }
        return acc;
      },
      {}
    );

    this.search.emit(activeFilters);
  }

  onPageChange(event: TuiTablePaginationEvent): void {
    this.pageChange.emit(event);
  }

  onUpdate(item: any): void {
    this.edit.emit(item);
  }

  onDelete(itemId: number): void {
    this.delete.emit(itemId);
  }
}
