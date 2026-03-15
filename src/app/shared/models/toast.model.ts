export interface Toast {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}