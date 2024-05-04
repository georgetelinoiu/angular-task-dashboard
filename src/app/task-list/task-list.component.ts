import { Component, OnInit } from '@angular/core';
import {TaskService} from "../services/taskservice.service";
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {EditTaskDialogComponent} from "./edit-task-dialog/edit-task-dialog.component";


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];

  constructor(private taskService: TaskService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(
      (data: any) => {
        this.tasks = data.result;
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  openEditDialog(task: { description: string }): void {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      width: '400px',
      data: { task: task, statuses: ['Pending', 'In Progress', 'Completed'] }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
