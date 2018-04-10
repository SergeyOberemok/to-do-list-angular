import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { Task } from '../shared/shared';

@Component({
    selector: 'tas-edit-task',
    templateUrl: './edit-task.component.html',
    styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit, OnChanges {
    @Input('task') inputTask: Task = null;
    public task: Task = null;
    @ViewChild('inputTodo') inputTodo: ElementRef;
    public deadline: NgbDateStruct = null;
    @Input('ok-title') okTitle: string;
    @Output('ok') okEvent: EventEmitter<Task> = null;
    @Output('cancel') cancelEvent: EventEmitter<any> = null;
    @Input('focus') focus: boolean;
    public todoIsInvalid: boolean;

    constructor(private parser: NgbDateParserFormatter) {
        this.task = new Task();
        this.okEvent = new EventEmitter();
        this.cancelEvent = new EventEmitter();
    }

    ngOnInit() {
        if (this.inputTask instanceof Task) {
            Object.assign(this.task, this.inputTask);
        }

        if (this.task.deadline !== null) {
            this.deadline = this.parser.parse(this.task.deadline);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.focus !== undefined && changes.focus.currentValue === true) {
            setTimeout(() => this.inputTodo.nativeElement.focus(), 100);
        }
    }

    public cancelClicked(): void {
        this.cancelEvent.emit(true);
    }

    public okClicked(): void {
        if (this.task.todo.length === 0) {
            this.todoIsInvalid = true;
            return;
        }

        if (this.task.deadline === null) {
            this.task.deadline = this.parser.format(this.minDate);
        }

        this.okEvent.emit(this.task);
    }

    public get minDate(): NgbDateStruct {
        return this.parser.parse((new Date()).toISOString());
    }

    public deadlineChanged(): void {
        this.task.deadline = this.parser.format(this.deadline);
    }

}
