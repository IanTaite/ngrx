import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MovieService } from '../services/movie.service';
import * as MovieActions from './movie.actions';
import { catchError, map, of, switchMap } from 'rxjs';

export const getAllMovies = createEffect(
  (actions$ = inject(Actions), movieService = inject(MovieService)) => {
    return actions$.pipe(
      ofType(MovieActions.getAllMovies),
      switchMap(() => {
        return movieService.get().pipe(
          map((movies) => MovieActions.getAllMoviesSuccess(movies)),
          catchError((error) => of(MovieActions.geAllMoviesFailure(error.message)))
        )
      })
    )
  },
  { functional: true }
);

export const getMovieById = createEffect(
  (actions$ = inject(Actions), movieService = inject(MovieService)) => {
    return actions$.pipe(
      ofType(MovieActions.getMovie),
      switchMap((action) => {
        return movieService.getById(action.id).pipe(
          map((movie) => MovieActions.getMovieSuccess(movie)),
          catchError((error) => of(MovieActions.getMovieFailure(error.message)))
        )
      })
    )
  },
  { functional: true }
);

export const updateMovie = createEffect(
  (actions$ = inject(Actions), movieService = inject(MovieService)) => {
    return actions$.pipe(
      ofType(MovieActions.updateMovie),
      switchMap((action) => {
        return movieService.put(action.movie).pipe(
          map((movie) => MovieActions.getMovieSuccess(movie)),
          catchError((error) => of(MovieActions.getMovieFailure(error.message)))
        )
      })
    )
  },
  { functional: true }
);

export const deleteMovie = createEffect(
  (actions$ = inject(Actions), movieService = inject(MovieService)) => {
    return actions$.pipe(
      ofType(MovieActions.deleteMovie),
      switchMap((action) => {
        return movieService.delete(action.id).pipe(
          map((movie) => MovieActions.deleteMovieSuccess(action.id)),
          catchError((error) => of(MovieActions.deleteMovieFailure(error.message)))
        )
      })
    )
  },
  { functional: true }
);
