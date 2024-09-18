import { IMovie } from '../models/movie.model';

export interface IMovieState {
  draft: IMovie | null,
  movies: IMovie[],
  apiBusy: boolean;
  apiError: string | null;
}

export const INITIAL_STATE: IMovieState = {
  draft: null,
  movies: [],
  apiBusy: false,
  apiError: null
};
