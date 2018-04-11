import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { tap, filter } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs/Subscription';

import { Task } from '../shared/shared';
import { TasksService } from '../tasks.service';
import { AppService } from '../../app.service';

@Component({
    selector: 'tas-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
    private subscriptions: Subscription[] = null;
    @Input('task') task: Task;
    @Output('remove') removeEvent: EventEmitter<Task> = null;
    @Output('done') doneEvent: EventEmitter<Task> = null;
    public isTitleClicked: boolean;
    public isEditingTask: boolean;
    public isRemoveClicked: boolean;
    public isDoneClicked: boolean;

    constructor(
        private tasksService: TasksService,
        private notificationsService: NotificationsService,
        private appService: AppService
    ) {
        this.subscriptions = [];
        this.removeEvent = new EventEmitter();
        this.doneEvent = new EventEmitter();
    }

    ngOnInit() {
        this.subscriptions.push(this.appService.focus
            .pipe(filter(emmiter => emmiter !== this))
            .subscribe(() => this.isTitleClicked = false));
    }

    OnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    public removeClicked($event: any): void {
        $event.preventDefault();

        this.isRemoveClicked = true;
        this.removeEvent.emit(this.task);
    }

    public titleClicked($event: any): void {
        $event.preventDefault();

        this.isTitleClicked = true;
        this.appService.focus.next(this);
    }

    public cancelClicked($event: any): void {
        this.isTitleClicked = false;
    }

    public updateTask($event: Task): void {
        this.isTitleClicked = false;
        this.isEditingTask = true;

        this.tasksService.update($event)
            .pipe(tap(() => this.isEditingTask = false))
            .subscribe(
                task => this.notificationsService.success('Update', 'Success'),
                error => {
                    console.error(error);
                    this.notificationsService.error('Update', 'Error');
                }
            );
    }

    public statusChanged($event: any): void {
        this.isDoneClicked = true;
        this.doneEvent.emit(this.task);
    }

}
