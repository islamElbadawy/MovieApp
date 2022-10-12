import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movie = null;
  imagesBaseUrl = environment.images;

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadMovieDetails(id);
  }

  loadMovieDetails(id){
    this.movieService.getMovieDetails(id).subscribe((res: any) =>{
      this.movie = res;
    });
  }

  openHomepage(){
    window.open(this.movie.homepage);
  }

}
