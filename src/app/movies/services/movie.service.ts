import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IMovie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  readonly #API_URL = 'http://localhost:3000/movies';
  readonly #http = inject(HttpClient);

  /**
   * Get all movies
   * @returns An array of movie objects, or an empty array if no movies are found
   */
  get(): Observable<IMovie[]> {
    return this.#http.get<IMovie[]>(`${this.#API_URL}`).pipe(
      map((movies: IMovie[]) => movies || []),
    );
  }

  /**
   * Get a movie by its id
   * @param id The numeric id of the movie to retrieve
   * @returns A movie object
   */
  getById(id: number): Observable<IMovie> {
    return this.#http.get<IMovie>(`${this.#API_URL}/movies/${id}"`);
  }

  /**
   * Update a movie
   * @param movie to be updated
   * @returns the updated movie
   */
  put(movie: IMovie): Observable<IMovie> {
    return this.#http.put<IMovie>(`${this.#API_URL}/movies/${movie.id}`, movie);
  }

  /**
   * Create a new movie
   */
  post(movie: IMovie): Observable<IMovie> {
    return this.#http.post<IMovie>(`${this.#API_URL}/movies/${movie.id}`, movie);
  }

  /**
   * Delete a movie by its id
   * @param id The numeric id of the movie to delete
   * @returns nothing
   */
  delete(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#API_URL}/movies/${id}`);
  }
}
