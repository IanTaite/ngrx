import { createSelector } from '@ngrx/store';
import { APPSTATE } from '../../app.state';

const stateSelector = (state: APPSTATE) => state.root;

export const movieSelector = createSelector(
  stateSelector,
  (state: any) => state.movies
);
