import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { EventListPage } from '../event-list/event-list';
import { formMethodConst } from '../../app/constants/form-method.const';
import moment from 'moment';
import { CalendarService } from '../../providers/calendar/calendar.service';
import { ToastService } from '../../providers/calendar/toast.service';
@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage implements OnInit {
  public formMethod;
  public startDate;
  public endDate;
  private params;
  event = { title: "", location: "", message: "", startDate: "", endDate: "" };

  constructor(public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private calendar: Calendar,
    private platform: Platform,
    private calendarService: CalendarService,
    private toastService: ToastService) {
    this.params = navParams;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage');
  }

  ngOnInit() {
    this.startDate = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString();
    console.log(this.startDate);
    // moment(Date.now()).add(60, 'seconds').format('YYYY-MM-DDThh:mm');
    const endDate = new Date((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).getTime() + 60000)).toISOString();

    console.log(endDate);
    this.endDate = new Date((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).getTime() + 60000)).toISOString();
    // this.endDate = endDate.toISOString();
    // this.endDate = moment(Date.now()).local().add(new Date().getTimezoneOffset() * 60000, 'seconds').toISOString();
    console.log(this.endDate);
    console.log('locale', moment.locale());
    if (this.params && !this.isEmpty(this.params.data)) {
      this.formMethod = formMethodConst.Edit;
    } else {
      this.formMethod = formMethodConst.Add;
    }
  }

  check() {
    alert('called');
  }
  isEmpty(obj) {
    return (Object.getOwnPropertyNames(obj).length === 0);
  }

  save() {
    if (this.platform.is('core')) {
      console.log(this.event.startDate);
    }
    if (this.formMethod === formMethodConst.Edit) {
      this.editEvent(this.params.data);
    } else {
      this.createEvent();
    }
  }

  createEvent() {
    alert(JSON.stringify(this.event));
    this.calendarService.createEvent(this.event).then(


      (msg) => {
        this.toastService.presentToast(this.createToastProperties('success'));
        this.navCtrl.push(EventListPage);
      },
      (err) => {
        this.toastService.presentToast(this.createToastProperties('failed'));
        this.navCtrl.push(EventListPage);
      }
    );
  }

  createToastProperties(status: string) {
    if (status === 'success') {
      return {
        message: 'Event saved successfully',
        position: 'top'
      }
    } else {
      return {
        message: 'Error in saving event',
        position: 'center',
      }
    }

  }

  editEvent(item: any) {
    if (this.platform.is('android')) {
      alert(JSON.stringify(item));
      this.calendar.deleteEvent(item.title, item.eventLocation, '', new Date(item.dtstart), new Date(item.dtend)).then(data => {
        if (data) {
          this.createEvent();
        }
      });
    } else if (this.platform.is('ios')) {
      this.calendar.modifyEvent(item.title, item.eventLocation, '', new Date(item.dtstart), new Date(item.dtend), this.event.title, this.event.location, this.event.message, new Date(this.event.startDate), new Date(this.event.endDate)).then(data => {
        alert(JSON.stringify(data));
      });
    }

  }

}
