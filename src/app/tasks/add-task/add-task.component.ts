import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { tap, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import { Task } from '../shared/shared';
import { TasksService } from '../tasks.service';
import { AppService } from '../../app.service';

@Component({
    selector: 'tas-add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
    private subscriptions: Subscription[] = null;
    public isLinkClicked: boolean;
    public task: Task = null;

    constructor(
        private tasksService: TasksService,
        private notificationsService: NotificationsService,
        private appService: AppService
    ) {
        this.subscriptions = [];
        this.task = new Task();
    }

    ngOnInit() {
        this.subscriptions.push(this.appService.focus
            .pipe(filter(emmiter => emmiter !== this))
            .subscribe(() => this.isLinkClicked = false));
    }

    OnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    public linkClicked($event: any): void {
        $event.preventDefault();

        this.isLinkClicked = true;
        this.appService.focus.next(this);
    }

    public cancelClicked($event: any): void {
        this.isLinkClicked = false;
        this.task = new Task();
    }

    public addTask($event: Task): void {
        this.tasksService.store($event)
            .pipe(tap(() => this.isLinkClicked = false))
            .subscribe(
                task => {
                    this.task = new Task();
                    this.notificationsService.success('Store', 'Success');
                },
                error => {
                    console.error(error);
                    this.notificationsService.error('Store', 'Error');
                }
            );
    }

}
