import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NotificationsService } from 'angular2-notifications';
import { filter } from 'rxjs/operators';

import { TasksService } from '../tasks.service';
import { Task } from '../shared/shared';

@Component({
    selector: 'tas-done-tasks',
    templateUrl: './done-tasks.component.html',
    styleUrls: ['./done-tasks.component.scss']
})
export class DoneTasksComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = null;
    public tasks: Task[] = null;

    constructor(private tasksService: TasksService, private notificationsService: NotificationsService) {
        this.subscriptions = [];
        this.tasks = [];
    }

    ngOnInit() {
        this.subscriptions.push(this.tasksService.doneTasks
            .pipe(filter(tasks => tasks !== null))
            .subscribe(tasks => this.tasks = tasks));
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    public fetchClicked($event: any): void {
        $event.preventDefault();

        this.tasksService.fetchDoneTasks();
    }

    public statusChanged(index: number): void {
        this.tasksService.makeTodo(this.tasks[index])
            .subscribe(
                () => this.notificationsService.success('Update', 'Success'),
                error => {
                    console.error(error);
                    this.notificationsService.error('Update', 'Error');
                }
            );
    }

}
