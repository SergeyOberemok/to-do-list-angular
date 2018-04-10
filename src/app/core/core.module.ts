import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import './vendor/vendor';
import './vendor/fontawesome';
import './vendor/rxjs';

import { NotificationsModule } from './notifications/notifications.module';

@NgModule({
    imports: [
        CommonModule,
        NotificationsModule
    ],
    declarations: [],
    exports: [NotificationsModule]
})
export class CoreModule { }
