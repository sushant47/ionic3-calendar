import { Injectable } from '@angular/core';
import { Calendar } from '@ionic-native/calendar';

@Injectable()
export class CalendarService {

  constructor(public calendar: Calendar) {

  }

  public createEvent(event) {
    return this.calendar.createEvent(event.title, event.location, event.message, new Date(event.startDate), new Date(event.endDate)).then(
      (msg) => {
        return msg;
      },
      (err) => {
        return err;
      }
    );
  }

  public loadEventListData(date) {
    // let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    let startDate = new Date(Date.now());
    let endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return this.calendar.listEventsInRange(startDate, endDate).then(value => {
      if (value) {
        return value;
      }
    });
  }
}
