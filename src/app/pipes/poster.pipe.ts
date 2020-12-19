import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'poster'
})
export class PosterPipe implements PipeTransform {

  transform(imageUrl: string): string {
    if (!imageUrl){
      return 'assets/no-image.jpg';
    }
    return `https://image.tmdb.org/t/p/w500${imageUrl}`;
  }

}
