import { Component } from '@angular/core';
import { Loading, LoadingController, NavController, ModalController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from "@ionic-native/barcode-scanner";
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
        url: ''
    };
    trustedVideoUrl: SafeResourceUrl;
    loading: Loading;
    imageSrc: string = null;
    resourceType: string = null;

    constructor(public navCtrl: NavController,
        public scanner: BarcodeScanner,
        public loadingCtrl: LoadingController,
        private domSanitizer: DomSanitizer,
        private modalCtrl: ModalController) {

    }

    youTubeGetID(url) {
        var ID = '';
        url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if (url[2] !== undefined) {
            ID = url[2].split(/[^0-9a-z_\-]/i);
            ID = ID[0];
        }
        else {
            ID = url;
        }
        return ID;
    }

    seeVideo(id): void {
        this.video.url = 'https://www.youtube.com/embed/' + id;
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

    scan(resourceType) {
        this.options = {
            prompt: 'Escanee su QR'
        }
        this.scanner.scan(this.options).then((data) => {
            let loading = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            loading.present();
            this.resourceType = resourceType;
            this.scannedData = data;
            switch (resourceType) {
                case 'Youtube Video':
                    const id = this.youTubeGetID(this.scannedData.text);
                    this.seeVideo(id);
                    loading.dismiss();
                    break;
                case 'Image':
                    this.imageSrc = this.scannedData.text;
                    loading.dismiss();
                    break;
                case '3D Animation':
                    this.imageSrc = this.scannedData.text;
                    loading.dismiss();
                    break;
            }

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

    goToOptions() {
        let discardModal = this.modalCtrl.create('OptionsPage', {

        });

        discardModal.present();

        discardModal.onDidDismiss(data => {
            if (data) {
                this.scan(data);
            }
        })
    }

}
