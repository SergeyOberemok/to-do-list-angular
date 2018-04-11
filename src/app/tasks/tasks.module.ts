import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TasksService } from './tasks.service';
import { TodoTasksComponent } from './todo-tasks/todo-tasks.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskComponent } from './task/task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { DoneTasksComponent } from './done-tasks/done-tasks.component';
import { DoneTaskComponent } from './done-task/done-task.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        NgbModule
    ],
    declarations: [TodoTasksComponent, AddTaskComponent, TaskComponent, EditTaskComponent, DoneTasksComponent, DoneTaskComponent],
    providers: [TasksService],
    exports: [TodoTasksComponent, AddTaskComponent, DoneTasksComponent]
})
export class TasksModule { }
