import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Task } from '../shared/shared';

@Component({
    selector: 'tas-done-task',
    templateUrl: './done-task.component.html',
    styleUrls: ['./done-task.component.scss']
})
export class DoneTaskComponent implements OnInit {
    @Input('task') task: Task;
    @Output('todo') todoEvent: EventEmitter<Task> = null;
    public isTodoClicked: boolean;

    constructor() {
        this.todoEvent = new EventEmitter();
    }

    ngOnInit() {
    }

    public statusChanged(): void {
        this.isTodoClicked = true;

        this.todoEvent.emit(this.task);
    }

}
