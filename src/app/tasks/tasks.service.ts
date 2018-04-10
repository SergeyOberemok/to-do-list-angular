import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, toArray } from 'rxjs/operators';
import { Observer } from 'rxjs/Observer';

import { Task, StoredTasks } from './shared/shared';

@Injectable()
export class TasksService {
    private storedTasks: StoredTasks = null;

    constructor(private http: HttpClient) {
        this.storedTasks = new StoredTasks();
    }

    public fetchTasks(): Observable<Task[]> {
        return this.storedTasks.getSubscription(this.makeFetchTasksRequest.bind(this));
    }

    private makeFetchTasksRequest(): Observable<Task[]> {
        return this.http.get<{ data: Task[] }>('/api/tasks').pipe(
            map(response => response.data),
            switchMap(tasks => Observable.from(tasks)),
            map(task => Object.assign(new Task(), task)),
            toArray()
        );
    }

    public store(task: Task): Observable<Task> {
        return this.http.post<{ data: Task }>('/api/tasks', task)
            .pipe(
                map(response => response.data),
                map(storedTask => Object.assign(new Task(), storedTask)),
                switchMap(storedTask => Observable.create((observer: Observer<Task>) => {
                    this.storedTasks.push(storedTask);

                    observer.next(storedTask);
                    observer.complete();
                }))
            );
    }

    public remove(task: Task): Observable<number> {
        return this.http.delete<{ data: number }>(`/api/tasks/${task._id}`)
            .pipe(
                map(response => response.data),
                switchMap(count => Observable.create((observer: Observer<number>) => {
                    this.storedTasks.remove(task);

                    observer.next(count);
                    observer.complete();
                }))
            );
    }

    public update(task: Task): Observable<Task> {
        return this.http.put<{ data: Task }>(`/api/tasks/${task._id}`, task)
            .pipe(map(response => response.data));
    }

}
