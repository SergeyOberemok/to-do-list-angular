import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule, Options } from 'angular2-notifications';

import { TasksModule } from './tasks/tasks.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { SIMPLE_NOTIFICATIONS_OPTIONS } from './shared/simple-notifications-options';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SimpleNotificationsModule.forRoot(SIMPLE_NOTIFICATIONS_OPTIONS as Options),
        NgbModule.forRoot(),
        TasksModule,
        CoreModule
    ],
    providers: [AppService],
    bootstrap: [AppComponent]
})
export class AppModule { }
