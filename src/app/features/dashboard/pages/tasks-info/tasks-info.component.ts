import { Component } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Task } from '../../../../shared/models/task.model';
import { ColDef } from 'ag-grid-community';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { AddTaskComponent } from '../add-task/add-task.component';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-tasks-info',
  standalone: true,
  imports: [DataTableComponent, AddTaskComponent],
  templateUrl: './tasks-info.component.html',
  styleUrl: './tasks-info.component.scss'
})
export class TasksInfoComponent {
  taskInfo: Task[] = [];
  columns: ColDef[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'todo', headerName: 'Task Title', flex: 2 },
    {
      field: 'completed',
      headerName: 'Status',
      valueFormatter: params => params.value ? `<span class="badge bg-success">Completed</span>`
        : `<span class="badge bg-warning">Pending</span>`,
      flex: 1
    },
    { field: 'userId', headerName: 'User ID', flex: 1 },
    {
      headerName: 'Actions',
      cellRenderer: () => `
    <button class="btn btn-sm btn-primary me-2 edit-btn">Edit</button>
    <button class="btn btn-sm btn-danger delete-btn">Delete</button>
  `
    }
  ];
  selectedTask: any = null;
  totalTasks: number = 0;

  constructor(
    private dashService: DashboardService,
    private toastService: ToastService
  ) {
  }

  ngOnInit() {
    this.loadTaskInfo();
  }

  loadTaskInfo = () => {
    this.dashService.getTaskInfo().subscribe(data => {
      this.taskInfo = data?.todos;
      this.totalTasks = data?.total;
    })
  }

  onCellClicked(event: any) {
    if (event.event.target.classList.contains('delete-btn')) {
      this.deleteTask(event.data);
    }
    if (event.event.target.classList.contains('edit-btn')) {
      this.editTask(event.data);
    }
  }

  editTask = (data: Task) => {
    this.selectedTask = data;
    const modal = new (window as any).bootstrap.Modal(
      document.getElementById('taskModal')
    );
    modal.show();
  }

  deleteTask = (data: Task) => {
    if (!confirm('Delete this task?')) return;
    if (data.id <= this.totalTasks) {
      this.dashService.deleteTask(data.id)
        .subscribe({
          next: (res) => {
            this.toastService.showSuccess('Task deleted successfully');
            this.taskInfo = this.taskInfo.filter(t => t.id !== data.id);
          },
          error: (err) => {
            const message =
              err?.error?.message || 'Something went wrong';
            this.toastService.showError(message);
          }
        }
        );
    }
    else {
      this.taskInfo = this.taskInfo.filter(t => t.id !== data.id);
    }
  }

  openAddTask = () => {
    this.selectedTask = null;
    const modal = new (window as any).bootstrap.Modal(
      document.getElementById('taskModal')
    );
    modal.show();
  }

  handleSaved(data: Task) {
    // const index = this.taskInfo.findIndex(
    //   t => t.id === data.id
    // );
    // if (index > -1) {
    //   this.taskInfo[index] = data;
    //   this.taskInfo = [...this.taskInfo];
    // } else {
      const exists = this.taskInfo.some(t => t.id === data.id);
      if (exists) {
        const maxId = Math.max(...this.taskInfo.map(t => t.id));
        data.id = maxId + 1;
      }
      this.taskInfo = [
        data,
        ...this.taskInfo
      ];
    // }
  }

  handleUpdate = (data: Task) => {
    const index = this.taskInfo.findIndex(
      t => t.id === data.id
    );
    this.taskInfo[index] = data;
    this.taskInfo = [...this.taskInfo];
  }

}
