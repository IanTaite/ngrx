import { createReducer, on } from '@ngrx/store';
import { INITIAL_STATE } from './movie.state';
import * as Action from './movie.actions';

export const reducer = createReducer(
  INITIAL_STATE,
  on(Action.loadMovies, (state) => ({
    ...state,
    movies: [],
    loading: true,
    loadError: null,
  })),
  on(Action.loadMoviesSuccess, (state, { movies }) => ({
    ...state,
    movies: [...movies],
    loading: false,
    loadError: null,
  })),
  on(Action.loadMoviesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loadError: error,
  }))
);
