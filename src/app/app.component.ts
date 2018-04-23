import { Component, OnInit } from '@angular/core';

import { SIMPLE_NOTIFICATIONS_OPTIONS } from './shared/simple-notifications-options';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public options: any = null;

    constructor() {
        this.options = SIMPLE_NOTIFICATIONS_OPTIONS;
    }

    ngOnInit() { }
}
