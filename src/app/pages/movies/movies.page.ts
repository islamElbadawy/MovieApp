import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies: any[] = [];
  currentPage = 1;
  imagesBaseUrl = environment.images;

  constructor(private movie: MovieService, private loaingCtr: LoadingController) { }

  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies(event?: InfiniteScrollCustomEvent){
    const loading = await this.loaingCtr.create({
      message: 'Loading...',
      spinner: 'bubbles'
    });

    await loading.present();
    this.movie.getTopRatedMovies(this.currentPage).subscribe((res: any) => {
      loading.dismiss();
      this.movies.push(...res.results);
      event?.target.complete();
      if(event){
        event.target.disabled = res.total_pages === this.currentPage;
      }
    });
  }

  loadMore(event: InfiniteScrollCustomEvent){
    this.currentPage++;
    this.loadMovies(event);
  }

}
