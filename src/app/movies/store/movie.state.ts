import { IMovie } from '../models/movie.model';

export interface IMovieState {
  draft: IMovie | null,
  movies: IMovie[],
  loading: boolean;
  apiError: string | null;
}

export const INITIAL_STATE: IMovieState = {
  draft: null,
  movies: [],
  loading: false,
  apiError: null
};
