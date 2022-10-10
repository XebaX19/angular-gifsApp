import { Component } from '@angular/core';

import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  //Inyectamos la dependencia del servicio
  constructor(private gifsService: GifsService) { }

  get historial(): string[] {
    return this.gifsService.historial;
  }

  buscar(item: string) {
    this.gifsService.buscarGifs(item);
  }

}
