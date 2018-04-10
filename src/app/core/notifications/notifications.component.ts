import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'not-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
    public options: any = null;

    constructor() {
        this.options = {
            timeOut: 2000,
            position: ['bottom', 'left'],
            showProgressBar: false
        };
    }

    ngOnInit() {
    }

}
