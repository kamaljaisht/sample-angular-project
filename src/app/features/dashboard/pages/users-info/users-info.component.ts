import { Component } from '@angular/core';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { ColDef } from 'ag-grid-community';
import { DashboardService } from '../../services/dashboard.service';
import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-users-info',
  standalone: true,
  imports: [DataTableComponent],
  templateUrl: './users-info.component.html',
  styleUrl: './users-info.component.scss'
})
export class UsersInfoComponent {
  columnDefs: ColDef[] = [
    { field: 'firstName' },
    { field: 'lastName' },
    { field: 'email' },
    { field: 'phone'},
    { field: 'role' },
    { field: 'username' },
    { field: 'password' }
  ];
  rowData: User[] = [];

  constructor(private dashService: DashboardService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers = () => {
    this.dashService.getUsers().subscribe(data => {
      this.rowData = data?.users;
    });
  }

}
