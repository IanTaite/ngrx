import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { APPSTATE } from '../../../app.state';
import { getAllMovies } from '../../store/movie.actions';
import { moviesSelector } from '../../store/movie.selectors';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    JsonPipe,
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListComponent implements OnInit {
  #store = inject(Store<APPSTATE>) as Store<APPSTATE>;

  movies$ = this.#store.select(moviesSelector);

  ngOnInit(): void {
    this.#store.dispatch(getAllMovies());
  }
}
