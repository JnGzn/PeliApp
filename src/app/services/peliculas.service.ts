import { Cast, CreditsResponse } from './../interfaces/credits-response';
import { MovieDetails } from './../interfaces/movie-respose';
import { CarteleraResponse, Movie } from './../interfaces/cartelera';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private url = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando = false;

  constructor(private http: HttpClient) { }

  get params(){
    return {
      api_key: '63b3121cb97accc815ed52e5591b8962',
      language: 'es-ES',
      page: this.carteleraPage.toString()

    };
  }
  obtenercartelera(): Observable<Movie[]>{
    if(this.cargando){
      return of([]);
    }
    this.cargando = true;
    console.log('llamando');

    return this.http.get<CarteleraResponse>(`${this.url}/movie/now_playing?`, {
       params: this.params
      }).pipe(
      map((resp) => resp.results),
      tap( () => {
        this.cargando = false;
        this.carteleraPage++;
      })
    );
  }

  buscarPelicula(query: string): Observable<Movie[]>{
    const params = {...this.params, page: '1', query};

    return this.http.get<CarteleraResponse>(`${this.url}/search/movie?`, {
      params
    }).pipe(
      map(res => res.results)
    );
  }

  resetCartelePage(): void{
    this.
    carteleraPage = 1;
  }

  obtenerDetallePelicula(id: string): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(`${this.url}/movie/${id}?`, {
      params: this.params
    }).pipe(
      catchError(err => of(null))
    );
  }

  obtenerCreditos(id: string): Observable<Cast[]>{
    return this.http.get<CreditsResponse>(`${this.url}/movie/${id}/credits?`, {
      params: this.params
    }).pipe(
      map( resp => resp.cast),
      catchError(err => of(null))
    );
  }
}
