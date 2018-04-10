import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { finalize } from 'rxjs/operators';

export abstract class Stored<T> {
    protected _item: T = null;
    private makeRequest: () => Observable<T> = null;
    private _request: Observable<T> = null;
    private emmiter: BehaviorSubject<T> = null;

    constructor() {
        this.emmiter = new BehaviorSubject(null);
    }

    public getSubscription(makeRequest: () => Observable<T>): Observable<T> {
        this.makeRequest = makeRequest;

        if (this.isEmpty && !this.isLoading) {
            this.request = this.makeRequest();
        }

        return this.emmiter;
    }

    protected set request(request: Observable<T>) {
        this._request = request;

        this._request
            .pipe(finalize(() => this._request = null))
            .subscribe(
                item => this.item = item,
                error => console.error(error)
            );
    }

    protected setItem(item: T) {
        this._item = item;
        this.emmiter.next(this._item);
    }

    public set item(item: T) {
        this.setItem(item);
    }

    public get isEmpty(): boolean {
        return this._item === null;
    }

    public get isLoading(): boolean {
        return this._request !== null;
    }

    public reset(): void {
        try {
            this.request = this.makeRequest();
        } catch (e) { }
    }

}
