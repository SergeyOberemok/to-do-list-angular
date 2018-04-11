import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { filter } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';

import { TasksService } from '../tasks.service';
import { Task } from '../shared/shared';

@Component({
    selector: 'tas-todo-tasks',
    templateUrl: './todo-tasks.component.html',
    styleUrls: ['./todo-tasks.component.scss']
})
export class TodoTasksComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = null;
    public tasks: Task[] = null;

    constructor(private tasksService: TasksService, private notificationsService: NotificationsService) {
        this.subscriptions = [];
        this.tasks = [];
    }

    ngOnInit() {
        this.subscriptions.push(this.tasksService.fetchTodoTasks()
            .pipe(filter(tasks => tasks !== null))
            .subscribe(tasks => this.tasks = tasks));
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    public removeTask($event: Task): void {
        this.tasksService.remove($event)
            .subscribe(
                count => this.notificationsService.success('Remove', 'Success'),
                error => {
                    console.error(error);
                    this.notificationsService.error('Remove', 'Error');
                }
            );
    }

    public makeTaskDone($event: Task): void {
        this.tasksService.makeDone($event)
            .subscribe(
                () => this.notificationsService.success('Update', 'Success'),
                error => {
                    console.error(error);
                    this.notificationsService.error('Remove', 'Error');
                }
            );
    }

    public get isTodoTasksFetching(): boolean {
        return this.tasksService.isTodoTasksFetching;
    }

}
