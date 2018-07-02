import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { Platform } from 'ionic-angular';
import { AddEventPage } from '../add-event/add-event';
import { CalendarService } from '../../providers/calendar/calendar.service';

/**
 * Generated class for the EventListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventListPage {

  public items;
  public date = new Date();
  public isApp: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, private calendar: Calendar,
    private platform: Platform, private calendarService: CalendarService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventListPage');
    this.checkPlatform();
  }

  itemSelected(item: any) {
  }

  checkPlatform() {
    if (this.platform.is('core') || this.platform.is('mobileweb')) {
      this.isApp = false;
      this.items = this.getMockEventsList();
      console.log(this.items);
    } else {
      this.isApp = true;
      this.loadEventListData();
    }
  }

  getMockEventsList() {
    return [{
      'calendar_id': '1',
      'title': 'test1',
      'dtstart': '21356',
      'dtend': '13213',
      'eventLocation': 'pune'
    },
    {
      'calendar_id': '1',
      'title': 'test2',
      'dtstart': '21356',
      'dtend': '13213',
      'eventLocation': 'pune'
    },
    {
      'calendar_id': '1',
      'title': 'test3',
      'dtstart': '21356',
      'dtend': '13213',
      'eventLocation': 'nasik'
    },
    {
      'calendar_id': '1',
      'title': 'test4',
      'dtstart': '21356',
      'dtend': '13213',
      'eventLocation': 'mumbai'
    },
    {
      'calendar_id': '1',
      'title': 'test5',
      'dtstart': '21356',
      'dtend': '13213',
      'eventLocation': 'pune'
    },
    {
      'calendar_id': '2',
      'title': 'test6',
      'dtstart': '21356',
      'dtend': '13213',
      'eventLocation': 'pune'
    }]
  }

  loadEventListData() {
    this.calendarService.loadEventListData(this.date).then(data => {
      this.items = data;
    });
  }
  deleteEvent(item: any) {
    if (this.isApp) {
      this.calendar.deleteEvent(item.title, item.eventLocation, '', new Date(item.dtstart), new Date(item.dtend)).then(data => {
        this.loadEventListData();
      });

    } else {
      for (let i = 0; i < this.items.length; i++) {

        if (this.items[i] == item) {
          this.items.splice(i, 1);
        }

      }
    }
  }

  editEvent(item: any) {
    alert(JSON.stringify(item));
    this.navCtrl.push(AddEventPage, item);
  }
}
