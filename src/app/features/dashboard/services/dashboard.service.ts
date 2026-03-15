import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UsersResponse } from '../../../shared/models/user.model';
import { Task, TaskInfoResponse } from '../../../shared/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private LOAD_USERS: string = environment.server_url + '/users';
  private TASK_INFO: string = environment.server_url + '/todos'

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(this.LOAD_USERS);
  }

  getTaskInfo(): Observable<TaskInfoResponse> {
    return this.http.get<TaskInfoResponse>(this.TASK_INFO);
  }

  addTask(payload: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(`${this.TASK_INFO}/add`, payload)
  }

  updateTask(id: number, payload: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.TASK_INFO}/${id}`, payload)
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.TASK_INFO}/${id}`)
  }
}
