import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, AgGridAngular],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent {
  @Input() data: any[] = [];
  @Input() columns: ColDef[] = [];
  @Output() cellClicked = new EventEmitter<any>();
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    floatingFilter: true
  }
  paginationPageSize = 10;
  paginationPageSizeSelector = [10, 20, 50, 100];
  gridApi: any;

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}
