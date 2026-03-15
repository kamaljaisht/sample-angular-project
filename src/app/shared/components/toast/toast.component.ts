import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { Toast } from '../../models/toast.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  toast: Toast | null = null;

  constructor(private toastService: ToastService) {
    this.toastService.toastState$.subscribe(data => {
      this.toast = data;
      setTimeout(() => {
        this.toast = null;
      }, 3000);
    });
  }
}
