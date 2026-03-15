import { Component } from '@angular/core';
import { UsersInfoComponent } from '../users-info/users-info.component';
import { TasksInfoComponent } from '../tasks-info/tasks-info.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UsersInfoComponent, TasksInfoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
