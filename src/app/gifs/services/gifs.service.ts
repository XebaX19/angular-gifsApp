import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Gif, SearchGifsResponse } from '../interfaces/gifs.interfaces';

// Este decorador le indica a Angular que el servicio va a ser global para toda la aplicación (no hace falta importarlo donde lo vaya a utilizar)
@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private servicioUrlBase = 'https://api.giphy.com/v1/gifs';
  private apiKey: string = 'xKNghWzA5ULmXBccc591IROq6euR8t4z'; //API Key Giphy
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  //Inyectamos el servicio HttpClient para realizar llamadas HTTP (importado en "app.module.ts")
  constructor(private http: HttpClient) { 

    //Regeneramos el historial según lo que tiene almacenado el LocalStorage
    this._historial = JSON.parse(localStorage.getItem('historial_gifsApp')!) || [];

    //Regeneramos las imágenes con el último resultado almacenado en LocalStorage
    this.resultados = JSON.parse(localStorage.getItem('ultimo_resultado_gifsApp')!) || [];
  }

  get historial() {
    return [...this._historial]; //Retorna una copia para romper la referencia y que no se pueda modificar el valor del atributo
  }

  buscarGifs(query: string = '') {
    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) { //Para evitar duplicados
      this._historial.unshift(query); //"unshift" inserta 1 elemento al inicio del array
      this._historial = this._historial.splice(0, 10); //Sólo mostramos los últimos 10 resultados

      localStorage.setItem('historial_gifsApp', JSON.stringify(this._historial)); //Guardamos el historial en el LocalStorage del navegador web
    }

    //Armamos query string con el HttpParams
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    //Para hacer la petición HTTP también se podría usar "fetch"
    //Pero el fetch retorna una promesa
    //El módulo Http de Angular retorna un Observable, que dispone de más funcionalidades que la promesa
    this.http.get<SearchGifsResponse>(`${this.servicioUrlBase}/search`, { params })
      .subscribe((resp: any) => {
        this.resultados = resp.data

        localStorage.setItem('ultimo_resultado_gifsApp', JSON.stringify(this.resultados))
      });
  }
}