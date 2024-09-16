import { createSelector } from '@ngrx/store';
import { APPSTATE } from '../../app.state';

const stateSelector = (state: APPSTATE) => state.root;

export const moviesSelector = createSelector(
  stateSelector,
  (state: any) => state.movies
);

export const draftMovieSelector = createSelector(
  stateSelector,
  (state: any) => state.draft
);
