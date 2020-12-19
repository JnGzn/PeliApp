import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit, OnDestroy {

  movies: Movie[] = [];
  moviesSlideShow: Movie[] = [];


  @HostListener('window:scroll', ['$event'])
  onScroll(): void{
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max = document.documentElement.scrollHeight || document.body.scrollHeight;

    if (pos > max && !this.peliculasService.cargando){
      this.peliculasService.obtenercartelera().subscribe(data => {
        this.movies.push(...data);
      });
    }
  }

  constructor(private peliculasService: PeliculasService){

  }

  ngOnInit(): void {
    this.peliculasService.obtenercartelera().subscribe(data => {
      this.movies = data;
      this.moviesSlideShow = data;
    });
  }

  ngOnDestroy(): void {
    this.peliculasService.resetCartelePage();
  }

}
