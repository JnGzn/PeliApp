import { Movie } from './../../interfaces/cartelera';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {
  movies: Movie[] = [];
  texto: string;
  constructor(private activatedRoute: ActivatedRoute,
              private peliculaService: PeliculasService) {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.texto = params['texto'];
      this.peliculaService.buscarPelicula(params['texto']).subscribe(movies => {
        this.movies = movies;
      });
    });
  }

  ngOnInit(): void {
  }

}
