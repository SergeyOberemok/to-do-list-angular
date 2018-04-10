import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppService {
    public focus: Subject<any> = null;

    constructor() {
        this.focus = new Subject();
    }

}
