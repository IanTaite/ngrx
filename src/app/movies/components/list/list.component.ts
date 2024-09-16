import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { APPSTATE } from '../../../app.state';
import { getAllMovies } from '../../store/movie.actions';
import { moviesSelector } from '../../store/movie.selectors';
import { Router } from '@angular/router';
import { IMovie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    JsonPipe,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  #router = inject(Router);
  #store = inject(Store<APPSTATE>) as Store<APPSTATE>;

  movies$ = this.#store.select(moviesSelector);

  onCreateButton_click() {
    this.#router.navigate(['create']);
  }
  onUpdateButton_click(movie: IMovie) {
    this.#router.navigate(['update', movie.id]);
  }

  ngOnInit(): void {
    this.#store.dispatch(getAllMovies());
  }
}
