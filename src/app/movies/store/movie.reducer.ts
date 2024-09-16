import { createReducer, on } from '@ngrx/store';
import { INITIAL_STATE } from './movie.state';
import * as Action from './movie.actions';

export const reducer = createReducer(
  INITIAL_STATE,
  on(Action.getAllMovies, (state) => ({
    ...state,
    movies: [],
    loading: true,
    apiError: null,
  })),
  on(Action.getAllMoviesSuccess, (state, { movies }) => ({
    ...state,
    movies: [...movies],
    loading: false,
    apiError: null,
  })),
  on(Action.geAllMoviesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    apiError: error,
  })),
  on(Action.getMovie, (state, { id }) => ({
    ...state,
    draft: null,
    loading: true,
    apiError: null,
  })),
  on(Action.getMovieSuccess, (state, { movie }) => ({
    ...state,
    draft: movie,
    loading: false,
    apiError: null,
  })),
  on(Action.getMovieFailure, (state, { error }) => ({
    ...state,
    loading: false,
    apiError: error,
  })),
  on(Action.createMovie, (state) => ({
    ...state,
    loading: true,
    apiError: null,
  })),
  on(Action.createMovieSuccess, (state, { movie }) => ({
    ...state,
    loading: false,
    apiError: null,
  })),
  on(Action.createMovieFailure, (state, { error }) => ({
    ...state,
    loading: false,
    apiError: error,
  })),
  on(Action.updateMovie, (state) => ({
    ...state,
  })),
  on(Action.updateMovieSuccess, (state, { movie }) => ({
    ...state,
    loading: false,
    apiError: null,
  })),
  on(Action.updateMovieFailure, (state, { error }) => ({
    ...state,
    loading: false,
    apiError: error,
  })),
  on(Action.deleteMovie, (state) => ({
    ...state,
  })),
  on(Action.deleteMovieSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    apiError: null,
  })),
  on(Action.deleteMovieFailure, (state, { error }) => ({
    ...state,
    loading: false,
    apiError: error,
  })),
);
