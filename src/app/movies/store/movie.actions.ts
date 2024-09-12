import { createAction } from '@ngrx/store';
import { IMovie } from '../models/movie.model';

export const loadMovies = createAction('[Movies] Load Movies');

export const loadMoviesSuccess = createAction(
  '[Movies] Load Movies Success',
  (movies: IMovie[]) => ({ movies })
);

export const loadMoviesFailure = createAction(
  '[Movies] Load Movies Failure',
  (error: string) => ({ error })
);
