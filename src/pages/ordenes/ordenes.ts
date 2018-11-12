import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-ordenes',
  templateUrl: 'ordenes.html',
})
export class OrdenesPage {

  orden: any[] =  [];
  horaRecoger;
  comentario;
  ordenMandada;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, 
    private alertCtrl: AlertController, private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdenesPage');
  }

  ionViewWillEnter() {
    this.storage.get('orden').then( (val) => {
      console.log(val);
      if (val) {
        this.orden = val.lista;
        console.log( this.orden );
      }
    });
    this.storage.get('ordenMandada').then( (val) => {
      console.log(val);
      if (val) {
        this.ordenMandada = val;
        console.log( this.ordenMandada );
      } else {
        this.ordenMandada = false;
      }
    });
    //this.horaRecoger = new Date();
  }

  borrarItem( index: number ) {
    this.orden.splice(index, 1);
    if (this.orden.length > 0) {
      this.storage.set('orden', this.orden);
    } else {
      this.storage.clear();
    }
    
  }

  ordenar() {
    const confirm = this.alertCtrl.create({
      title: '¿Estás seguro de ordenas esto?',
      message: 'No podrás cambiarlo',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            let loading = this.loadingCtrl.create({
              spinner: 'hide',
              content: `
              <ion-spinner name="bubbles"></ion-spinner>
              Ordenando...
                `,
              duration: 2000
            });
          
            loading.onDidDismiss(() => {
              this.ordenMandada = true;
              this.storage.set('ordenMandada', this.ordenMandada);
              let toast = this.toastCtrl.create({
                message: 'Tu orden ha sido enviada',
                duration: 3000,
                position: 'bottom'
              });

              toast.onDidDismiss(() => {
                console.log('Dismissed toast');
              });
            
              toast.present();
            });
          
            loading.present();
          }
        }
      ]
    });
    confirm.present();
  }
}
