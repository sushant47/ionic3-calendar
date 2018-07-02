import { Injectable } from "@angular/core";
import { ToastController } from "ionic-angular";

@Injectable()
export class ToastService {
    constructor(private toastCtrl: ToastController) {

    }

    public presentToast(toastData) {
        let toast = this.toastCtrl.create({
            message: toastData.message,
            position: toastData.position,
            showCloseButton: true
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }
}