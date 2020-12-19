import { ImplicitReceiver } from '@angular/compiler';
import { AfterContentInit, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera';
import Swiper from "swiper";
@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input()
  movies: Movie[];
  mySwiper: Swiper;
  constructor() { }
  ngAfterViewInit(): void {
    this.mySwiper = new Swiper('.swiper-container', {
      loop: true,
    });
  }

  ngOnInit(): void {

  }

  onSlideNext(): void{
    this.mySwiper.slideNext();
  }

  onSlidePrev(): void{
    this.mySwiper.slidePrev();
  }


}
