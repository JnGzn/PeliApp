import { Cast } from './../../interfaces/credits-response';
import { MovieDetails } from './../../interfaces/movie-respose';
import { PeliculasService } from './../../services/peliculas.service';
import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styles: [
  ]
})
export class PeliculaComponent implements OnInit {

  movie: MovieDetails;
  cast: Cast[];
  constructor(private activatedRoute: ActivatedRoute,
              private peliculaService: PeliculasService,
              private location: Location) { }

  ngOnInit(): void {
    const {id} = this.activatedRoute.snapshot.params;

    combineLatest([
      this.peliculaService.obtenerDetallePelicula(id),
      this.peliculaService.obtenerCreditos(id)
    ]).subscribe(([pelicula, cast]) => {
      if (!pelicula){
        this.regresar();
        return;
      }
      this.movie = pelicula;
      this.cast = cast;

    });

    // this.peliculaService.obtenerDetallePelicula(id).subscribe(data=>{
    //   if (!data){
    //     this.regresar();
    //     return;
    //   }
    //   this.movie = data;
    // }, (err) => { this.regresar() });

    // this.peliculaService.obtenerCreditos(id).subscribe(resp => {
    //   if (!resp){
    //     this.regresar();
    //     return;
    //   }
    //   this.cast = resp;
    // });
  }

  regresar(): void{
    this.location.back();
  }

}
