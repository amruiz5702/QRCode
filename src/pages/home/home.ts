import {Component} from '@angular/core';
import {Loading, LoadingController,NavController} from 'ionic-angular';
import {BarcodeScanner, BarcodeScannerOptions} from "@ionic-native/barcode-scanner";
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    options: BarcodeScannerOptions;
    encodeText: string = '';
    encodedData: any = {};
    scannedData: any = {};
    str: any = {};
    video: any = {
        url: '',
        title: 'Awesome video'
    };
    trustedVideoUrl: SafeResourceUrl;
    loading: Loading;

    constructor(public navCtrl: NavController,
                public scanner: BarcodeScanner,
                public loadingCtrl: LoadingController,
                private domSanitizer: DomSanitizer) {

    }

    YouTubeGetID(url){
        var ID = '';
        url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if(url[2] !== undefined) {
            ID = url[2].split(/[^0-9a-z_\-]/i);
            ID = ID[0];
        }
        else {
            ID = url;
        }
        return ID;
    }

    seeVideo(id): void {
        this.video.url = 'https://www.youtube.com/embed/'+id;
        this.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.video.url);

        console.log(this.trustedVideoUrl);
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        this.loading.present();
    }

    handleIFrameLoadEvent(): void {
        this.loading.dismiss();
    }

    scan() {
        this.options = {
            prompt: 'Scan your barcode'
        }
        this.scanner.scan(this.options).then((data) => {
            this.scannedData = data;
            const id = this.YouTubeGetID(this.scannedData.text);
            this.seeVideo(id);
        }, (err) => {
            console.log('Error: ', err)
        })


    }

    encode() {
        this.scanner.encode(this.scanner.Encode.TEXT_TYPE, this.encodeText).then((data) => {
            this.encodedData = data;

        }, (err) => {
            console.log('Error: ', err)
        })
    }

}
