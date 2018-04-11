import { Stored } from '../../core/shared/shared';
import { Task } from './task';

export class StoredTasks extends Stored<Task[]> {

    public push(task: Task): void {
        this._item.push(task);

        this.setItem(Object.assign([], this._item));
    }

    public remove(task: Task): void {
        const index = this._item.indexOf(task);
        this._item.splice(index, 1);

        this.setItem(Object.assign([], this._item));
    }

    public update(updatedTask: Task): void {
        const task = this._item.find(item => item.id === updatedTask.id);
        Object.assign(task, updatedTask);

        this.setItem(Object.assign([], this._item));
    }

}
