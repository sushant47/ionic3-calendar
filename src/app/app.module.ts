import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Calendar } from '@ionic-native/calendar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EditEventPage } from '../pages/edit-event/edit-event';
import { EventListPage } from '../pages/event-list/event-list';
import { AddEventPage } from '../pages/add-event/add-event';
import { CalendarModule } from 'angular-calendar';
import { CalendarPage } from '../pages/calendar/calendar';
import { CalendarService } from '../providers/calendar/calendar.service';
import { ToastService } from '../providers/calendar/toast.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EditEventPage,
    EventListPage,
    AddEventPage,
    CalendarPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CalendarModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EditEventPage,
    EventListPage,
    AddEventPage,
    CalendarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Calendar,
    ErrorHandler,
    CalendarService,
    ToastService
  ]
})
export class AppModule { }
