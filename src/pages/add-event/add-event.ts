import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { EventListPage } from '../event-list/event-list';
import { formMethodConst } from '../../app/constants/form-method.const';
import { isDefaultChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';

@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage implements OnInit {
  public formMethod;

  private params;
  event = { title: "", location: "", message: "", startDate: "", endDate: "" };

  constructor(public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private calendar: Calendar) {
    this.params = navParams;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage');
  }

  ngOnInit() {
    if (this.params && !this.isEmpty(this.params.data)) {
      this.formMethod = formMethodConst.Edit;
    } else {
      this.formMethod = formMethodConst.Add;
    }
  }

  isEmpty(obj) {
    return (Object.getOwnPropertyNames(obj).length === 0);
  }

  save() {
    if (this.formMethod === formMethodConst.Edit) {
      this.editEvent(this.params);
    } else {
      this.calendar.createEvent(this.event.title, this.event.location, this.event.message, new Date(this.event.startDate), new Date(this.event.endDate)).then(
        (msg) => {
          let alert = this.alertCtrl.create({
            title: 'Success!',
            subTitle: 'Event saved successfully',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.push(EventListPage);
        },
        (err) => {
          let alert = this.alertCtrl.create({
            title: 'Failed!',
            subTitle: err,
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.push(EventListPage);
        }
      );
    }
  }

  editEvent(item: any) {
    alert(JSON.stringify(item));
    this.calendar.modifyEvent(item.title, item.eventLocation, '', new Date(item.dtstart), new Date(item.dtend), this.event.title, this.event.location, this.event.message, new Date(this.event.startDate), new Date(this.event.endDate)).then(data => {
      alert(JSON.stringify(data));
    });


  }

}
