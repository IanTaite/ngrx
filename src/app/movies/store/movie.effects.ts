import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MovieService } from '../services/movie.service';
import * as MovieActions from './movie.actions';
import { catchError, map, of, switchMap } from 'rxjs';

export const loadMovies = createEffect(
  (actions$ = inject(Actions), movieService = inject(MovieService)) => {
    return actions$.pipe(
      ofType(MovieActions.loadMovies),
      switchMap(() => {
        return movieService.get().pipe(
          map((movies) => MovieActions.loadMoviesSuccess(movies)),
          catchError((error) => of(MovieActions.loadMoviesFailure(error.message)))
        )
      })
    )
  },
  { functional: true }
);
