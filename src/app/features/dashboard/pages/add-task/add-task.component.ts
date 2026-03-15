import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
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
  @Input() totalTasks: any;
  @Output() saved = new EventEmitter<Task>();
  @Output() updateData = new EventEmitter<Task>();
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty("task") && changes["task"].currentValue) {
      this.isEditMode = true;
      this.taskForm.patchValue(this.task);
    }
    else {
      this.isEditMode = false;
      this.taskForm.reset({ completed: false });
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
      if (this.task.id <= this.totalTasks) {
        this.dashService
          .updateTask(this.task.id, payload)
          .subscribe({
            next: (res) => {
              this.updateData.emit(res);
              this.showSuccessAndClose();
            },
            error: (err) => {
              this.showError(err);
            }
          });
      } else {
        this.updateData.emit({ ...this.taskForm.value, id: this.task.id });
        this.showSuccessAndClose();
      }
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
    this.toastService.showSuccess(`Task ${this.isEditMode ? 'updated' : 'added'} successfully`);
    this.loading = false;
    this.isEditMode = false;
    this.taskForm.reset({ completed: false });
    const modalElement = document.getElementById('taskModal');
    const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
    (document.activeElement as HTMLElement)?.blur();
    modal.hide();
  }

  showError(err: any) {
    const message =
      err?.error?.message || 'Something went wrong';
    this.toastService.showError(message);
    this.loading = false;
  }

}
