import { createAction } from '@ngrx/store';
import { IMovie } from '../models/movie.model';

/*****************************************************************************/

export const getAllMovies = createAction('[Movies] Load Movies');

export const getAllMoviesSuccess = createAction(
  '[Movies] Load Movies Success',
  (movies: IMovie[]) => ({ movies })
);

export const geAllMoviesFailure = createAction(
  '[Movies] Load Movies Failure',
  (error: string) => ({ error })
);

/*****************************************************************************/

export const getMovie = createAction(
  '[Movies] Get Movie',
  (id: number) => ({ id })
);

export const getMovieSuccess = createAction(
  '[Movies] Get Movie Success',
  (movie: IMovie) => ({ movie })
);

export const getMovieFailure = createAction(
  '[Movies] Get Movie Failure',
  (error: string) => ({ error })
);

/*****************************************************************************/

export const createMovie = createAction(
  '[Movies] Create Movie',
  (movie: IMovie) => ({ movie })
);

export const createMovieSuccess = createAction(
  '[Movies] Create Movie Success',
  (movie: IMovie) => ({ movie })
);

export const createMovieFailure = createAction(
  '[Movies] Create Movie Failure',
  (error: string) => ({ error })
);

/*****************************************************************************/

export const updateMovie = createAction(
  '[Movies] Update Movie',
  (movie: IMovie) => ({ movie })
);

export const updateMovieSuccess = createAction(
  '[Movies] Update Movie Success',
  (movie: IMovie) => ({ movie })
);

export const updateMovieFailure = createAction(
  '[Movies] Update Movie Failure',
  (error: string) => ({ error })
);

/*****************************************************************************/

export const deleteMovie = createAction(
  '[Movies] Delete Movie',
  (id: number) => ({ id })
);

export const deleteMovieSuccess = createAction(
  '[Movies] Delete Movie Success',
  (id: number) => ({ id })
);

export const deleteMovieFailure = createAction(
  '[Movies] Delete Movie Failure',
  (error: string) => ({ error })
);

/*****************************************************************************/
