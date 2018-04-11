import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, toArray, tap } from 'rxjs/operators';
import { Observer } from 'rxjs/Observer';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Task, StoredTasks } from './shared/shared';

@Injectable()
export class TasksService {
    private storedTodoTasks: StoredTasks = null;
    private storedDoneTasks: { tasks: Task[] } = null;
    public doneTasks: BehaviorSubject<Task[]> = null;
    public isTodoTasksFetching: boolean;
    public isDoneTasksFetching: boolean;

    constructor(private http: HttpClient) {
        this.storedTodoTasks = new StoredTasks();
        this.storedDoneTasks = { tasks: null };
        this.doneTasks = new BehaviorSubject(Object.assign({}, this.storedDoneTasks).tasks);
    }

    public fetchTodoTasks(): Observable<Task[]> {
        return this.storedTodoTasks.getSubscription(this.makeFetchTodoTasksRequest.bind(this));
    }

    private makeFetchTodoTasksRequest(): Observable<Task[]> {
        this.isTodoTasksFetching = true;

        return this.http.get<{ data: Task[] }>('/api/tasks', { params: { done: 'false' } })
            .pipe(
                map(response => response.data),
                switchMap(tasks => Observable.from(tasks)),
                map(task => Object.assign(new Task(), task)),
                toArray(),
                tap(() => this.isTodoTasksFetching = false)
            );
    }

    public fetchDoneTasks(): void {
        this.isDoneTasksFetching = true;

        this.http.get<{ data: Task[] }>('/api/tasks', { params: { done: 'true' } })
            .pipe(
                map(response => response.data),
                switchMap(tasks => Observable.from(tasks)),
                map(task => Object.assign(new Task(), task)),
                toArray(),
                tap(() => this.isDoneTasksFetching = false)
            )
            .subscribe(
                tasks => {
                    this.storedDoneTasks.tasks = tasks;
                    this.doneTasks.next(Object.assign({}, this.storedDoneTasks).tasks);
                },
                error => console.error(error)
            );
    }

    public store(task: Task): Observable<Task> {
        return this.http.post<{ data: Task }>('/api/tasks', task)
            .pipe(
                map(response => response.data),
                map(storedTask => Object.assign(new Task(), storedTask)),
                switchMap(storedTask => Observable.create((observer: Observer<Task>) => {
                    this.storedTodoTasks.push(storedTask);

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
                    this.storedTodoTasks.remove(task);

                    observer.next(count);
                    observer.complete();
                }))
            );
    }

    private makeUpdateRequest(task: Task): Observable<Task> {
        return this.http.put<{ data: Task }>(`/api/tasks/${task._id}`, task)
            .pipe(map(response => response.data));
    }

    public update(task: Task): Observable<Task> {
        return this.makeUpdateRequest(task)
            .pipe(
                switchMap(updatedTask => Observable.create((observer: Observer<Task>) => {
                    this.storedTodoTasks.update(updatedTask);

                    observer.next(updatedTask);
                    observer.complete();
                }))
            );
    }

    public makeDone(task: Task): Observable<Task> {
        return this.makeUpdateRequest(task)
            .pipe(
                switchMap(updatedTask => Observable.create((observer: Observer<Task>) => {
                    this.storedTodoTasks.remove(task);

                    if (this.storedDoneTasks.tasks !== null) {
                        this.storedDoneTasks.tasks.push(task);
                        this.doneTasks.next(Object.assign({}, this.storedDoneTasks).tasks);
                    }

                    observer.next(updatedTask);
                    observer.complete();
                }))
            );
    }

    public makeTodo(task: Task): Observable<Task> {
        return this.makeUpdateRequest(task)
            .pipe(
                switchMap(updatedTask => Observable.create((observer: Observer<Task>) => {
                    const index = this.storedDoneTasks.tasks.indexOf(task);
                    this.storedDoneTasks.tasks.splice(index, 1);
                    this.doneTasks.next(Object.assign({}, this.storedDoneTasks).tasks);

                    this.storedTodoTasks.push(task);

                    observer.next(updatedTask);
                    observer.complete();
                }))
            );
    }

}
