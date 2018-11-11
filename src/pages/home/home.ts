import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	menu: any[] = [
		{
			comida: 'Quesadilla',
			disponible: true,
			stock: 25,
			precio: 15,
			img: 'https://cdn.shopify.com/s/files/1/1850/4533/products/jelp-app-ti'
			+ 'juana-asadero-tecolote-quesadilla_con_carne_530x_2x_3fd4f4f7-6d7a-4c11-9141-6300ea2471ad_800x.png?v=1526174387',
			descripcion: 'Quesadillas de tortilla de harina hechas con mucho queso'
		},
		{
			comida: 'Torta',
			disponible: true,
			stock: 40,
			precio: 19,
			img: 'https://www.lacampanacyt.com/images/menu/tipicos-mexicanos/Torta-cubana.jpg',
			descripcion: 'Tortas de bistek, pastor, y otras...'
		},
		{
			comida: 'Baguette',
			disponible: true,
			stock: 40,
			precio: 19,
			img: 'https://cocinaconalegria.com/media/zoo/images/Img20389_538aa00b8eb6fe265aa2c7e91e4b7621.jpg',
			descripcion: 'Tortas de bistek, pastor, y otras...'
		}
	];

  constructor(public navCtrl: NavController) {

  }

}
