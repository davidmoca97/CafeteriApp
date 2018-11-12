import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { OrdenesPage } from '../ordenes/ordenes';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the FichaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ficha',
  templateUrl: 'ficha.html',
})
export class FichaPage {

  comida: any = {};
  guisados: any[]= [
    {
      guisado: 'Chicharron verde',
      seleccionado: false
    },
    {
      guisado: 'Chicharron rojo',
      seleccionado: false
    },
    {
      guisado: 'Rajas',
      seleccionado: false
    },
    {
      guisado: 'Tinga',
      seleccionado: false
    },
    {
      guisado: 'Mole',
      seleccionado: false
    }
  ];
  guisadosSeleccionados: number = 0;
  tipoSeleccionadoIDX: number = -1;
  ordenMandada: boolean;
   
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private storage: Storage)  {
    this.comida = this.navParams.get( 'comida' );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FichaPage');
  }

  ionViewWillEnter() {
    this.guisadosSeleccionados = 0;
    this.tipoSeleccionadoIDX = -1;
    this.guisados.forEach( (item) => {
      item.seleccionado = false;
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
  }

  seleccionarTipo( index ) {
    if ( this.tipoSeleccionadoIDX === index ) {
      this.tipoSeleccionadoIDX = -1;
    } else {
      this.tipoSeleccionadoIDX = index;
    }
  }
  
  seleccionarGuisado( index ) {
    if ( this.guisados[index].seleccionado ) {
      this.guisados[index].seleccionado = false;
      this.guisadosSeleccionados--;
    } else if (!this.guisados[index].seleccionado && this.guisadosSeleccionados < 3) {
      this.guisados[index].seleccionado = true;
      this.guisadosSeleccionados++;
    }
  }

  ingresarMensaje() {
    let alert = this.alertCtrl.create({
      title: 'Confirma',
      message: 'Ingresa las unidades a ordenar',
      inputs: [
        {
          name: 'cantidad',
          placeholder: 'Cantidad',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: data => {
            if ( data.cantidad <= this.comida.stock && data.cantidad > 0 ) {
              console.log( 'si pasa ');
              let guisadosOrden;
              let tipoComida;
              if (this.comida.conGuisado) {
                guisadosOrden = this.guisados.filter( (guisado) => {
                  return guisado.seleccionado;
                });
              } else {
                tipoComida = this.comida.tipo[this.tipoSeleccionadoIDX];
              }
              const semiOrden: any = {
                comida: this.comida,
                guisadosOrden: guisadosOrden,
                tipoComida: tipoComida,
                cantidad: data.cantidad
              }
              this.storage.get('orden').then( (json) => {
                if (json) {
                  console.log( json );
                  json.lista.push(semiOrden);
                  this.storage.set('orden', json);
                } else {
                  this.storage.set('orden', { lista: [semiOrden] });
                }
                this.navCtrl.push( OrdenesPage, {
                  nuevo: true
                });
              });
            } else {
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }
}
