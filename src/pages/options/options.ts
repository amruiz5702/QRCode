import {Component} from '@angular/core';
import {IonicPage, 
    NavController, 
    NavParams, 
    ViewController, 
    AlertController, 
    LoadingController} from 'ionic-angular';

/**
 * Generated class for the OptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-options',
    templateUrl: 'options.html'
})

export class OptionsPage {

    constructor(public navCtrl: NavController, 
        public navParams: NavParams, 
        public viewCtrl: ViewController, 
        public loadingCtrl: LoadingController, 
        public alertCtrl: AlertController, 
        public params: NavParams) {
       
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad OptionsPage');
    }

    cancelOperation() {
        this.viewCtrl.dismiss();
    }

    resourceToScan(resourceType) {
        this.viewCtrl.dismiss(resourceType);
    }

}
