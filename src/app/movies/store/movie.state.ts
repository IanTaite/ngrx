import { IMovie } from '../models/movie.model';

export interface IMovieState {
  movies: IMovie[],
  loading: boolean;
  loadError: string | null;
}

export const INITIAL_STATE: IMovieState = {
  movies: [],
  loading: false,
  loadError: null
};
