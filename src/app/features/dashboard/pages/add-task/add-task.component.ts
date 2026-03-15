import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { CommonModule } from '@angular/common';
import { Task } from '../../../../shared/models/task.model';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  @Input() task: any;
  @Output() saved = new EventEmitter<Task>();
  isEditMode: boolean = false;
  loading: boolean = false;
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dashService: DashboardService,
    private toastService: ToastService
  ) {
    this.taskForm = this.fb.group({
      userId: ["", Validators.required],
      todo: ['', Validators.required],
      completed: [false]
    });
  }

  ngOnChanges() {
    if (this.task) {
      this.isEditMode = true;
      this.taskForm.patchValue(this.task);
    }
  }

  submitTask() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    const payload = this.taskForm.value;
    if (this.isEditMode) {
      this.dashService
        .updateTask(this.task.id, payload)
        .subscribe({
          next: (res) => {
            this.saved.emit(res);
            this.showSuccessAndClose();
          },
          error: (err) => {
            this.showError(err);
          }
        });
    } else {
      this.dashService
        .addTask(payload)
        .subscribe({
          next: (res) => {
            this.saved.emit(res);
            this.showSuccessAndClose();
          },
          error: (err) => {
            this.showError(err);
          }
        });
    }
  }

  showSuccessAndClose() {
    this.toastService.showSuccess('Task added successfully');
    setTimeout(() => {
      this.loading = false;
      const modalElement = document.getElementById('taskModal');
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      (document.activeElement as HTMLElement)?.blur();
      modal.hide();
    }, 1000);
  }

  showError(err: any) {
    const message =
      err?.error?.message || 'Something went wrong';
    this.toastService.showError(message);
    this.loading = false;
  }

}
