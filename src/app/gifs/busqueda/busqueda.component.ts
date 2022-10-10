import { Component, ElementRef, ViewChild } from '@angular/core';

import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  //Decorador para asociar el elemento del HTML a Typescript (asocio el elemento #txtBuscar del HTML a la variable txtBuscar así luego la puedo usar/setear/limpiar/etc)
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>; //El "!" indica Non-null assertion operation (para indicarle a Typescript que ese elemento nunca va a ser nulo)
  
  //Inyectamos la dependencia del servicio
  constructor(private gifService: GifsService) { }

  buscar() {
    const valor = this.txtBuscar.nativeElement.value;

    if (valor.trim().length === 0) {
      return;
    }

    this.gifService.buscarGifs(valor);

    this.txtBuscar.nativeElement.value = '';
  }
}
