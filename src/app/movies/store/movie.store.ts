import { inject, Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';
import { IMovieState, INITIAL_STATE } from "./movie.state";
import { MovieService } from "../services/movie.service";
import { IMovie } from "../models/movie.model";
import { catchError, EMPTY, Observable, of, switchMap, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MovieStore extends ComponentStore<IMovieState> {
  readonly #movieService = inject(MovieService);

  readonly #draft$ = this.select(state => state.draft);
  readonly #movies$ = this.select(state => state.movies);
  readonly #apiBusy$ = this.select(state => state.apiBusy);
  readonly #apiError$ = this.select(state => state.apiError);

  vm$ = this.select({
    draft: this.#draft$,
    movies: this.#movies$,
    apiBusy: this.#apiBusy$,
    apiError: this.#apiError$
  });

  readonly #onGetMovies = this.updater((state) => ({...state, apiBusy: true }));
  readonly #onGetMoviesSuccess = this.updater((state, movies: IMovie[]) => ({...state, movies: movies }));
  readonly #onGetMoviesFailure = this.updater((state, error: string) => ({...state, apiError: error, apiBusy: false }));

  readonly #onGetMovie = this.updater((state) => ({...state, apiBusy: true }));
  readonly #onGetMovieSuccess = this.updater((state, movie: IMovie) => ({...state, draft: movie }));
  readonly #onGetMovieFailure = this.updater((state, {id, err}: {id: number, err: string}) => ({...state, apiError: err, apiBusy: false }));

  readonly #onCreateMovie = this.updater((state) => ({...state, apiBusy: true }));
  readonly #onCreateMovieSuccess = this.updater((state, movie: IMovie) => ({...state, apiBusy: false }));
  readonly #onCreateMovieFailure = this.updater((state, {id, err}: {id: number, err: string}) => ({...state, apiError: err, apiBusy: false }));

  readonly #onUpdateMovie = this.updater((state) => ({...state, apiBusy: true }));
  readonly #onUpdateMovieSuccess = this.updater((state, movie: IMovie) => ({...state, apiBusy: false }));
  readonly #onUpdateMovieFailure = this.updater((state, {id, err}: {id: number, err: string}) => ({...state, apiError: err, apiBusy: false }));

  readonly #onDeleteMovie = this.updater((state) => ({...state, apiBusy: true }));
  readonly #onDeleteMovieSuccess = this.updater((state, id: number) => ({...state, apiBusy: false }));
  readonly #onDeleteMovieFailure = this.updater((state, {id, err}: {id: number, err: string}) => ({...state, apiError: err, apiBusy: false }));

  getMovies = this.effect<void>(() => {
    return of(undefined).pipe(
      tap(() => this.#onGetMovies()),
      switchMap(() => this.#movieService.get().pipe(
        tap({
          next: (movies: IMovie[]) => this.#onGetMoviesSuccess(movies),
          error: (error: any) => this.#onGetMoviesFailure(error),
        })
      )),
      catchError(() => EMPTY)
    );
  });

  getMovie = this.effect((movieId$: Observable<number>) => {
    return movieId$.pipe(
      tap(() => this.#onGetMovie()),
      switchMap((movieId: number) => this.#movieService.getById(movieId).pipe(
        tap({
          next: (movie: IMovie) => this.#onGetMovieSuccess(movie),
          error: (err: any) => this.#onGetMovieFailure({id: movieId, err}),
        })
      )),
      catchError(() => EMPTY)
    );
  });

  createMovie = this.effect((movie$: Observable<IMovie>) => {
    return movie$.pipe(
      tap(() => this.#onCreateMovie()),
      switchMap((movie: IMovie) => this.#movieService.post(movie).pipe(
        tap({
          next: (movie: IMovie) => this.#onCreateMovieSuccess(movie),
          error: (err: any) => this.#onCreateMovieFailure({id: movie.id, err})
        }),
      )),
      catchError(() => EMPTY)
    );
  });

  updateMovie = this.effect(( movie$: Observable<IMovie> ) => {
    return movie$.pipe(
      tap(() => this.#onUpdateMovie()),
      switchMap((movie: IMovie) => this.#movieService.put(movie).pipe(
        tap({
          next: (movie: IMovie) => this.#onUpdateMovieSuccess(movie),
          error: (err: any) => this.#onUpdateMovieFailure({id: movie.id, err})
        }),
      )),
      catchError(() => EMPTY)
    );
  });

  deleteMovie = this.effect(( id$: Observable<number> ) => {
    return id$.pipe(
      tap(() => this.#onDeleteMovie()),
      switchMap((id: number) => this.#movieService.delete(id).pipe(
        tap({
          next: () => this.#onDeleteMovieSuccess(id),
          error: (err: any) => this.#onDeleteMovieFailure({id, err})
        }),
      )),
      catchError(() => EMPTY)
    );
  });

  constructor() {
    super(INITIAL_STATE);
  }
}
