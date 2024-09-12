import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { routes } from './app.routes';

import { reducer as movieReducer } from './movies/store/movie.reducer';
import * as MovieEffects from './movies/store/movie.effects';
import { APPSTATE } from './app.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore<APPSTATE>({ root: movieReducer }),
    provideEffects(MovieEffects),
    provideStoreDevtools({ maxAge: 25, name: 'Movie App Store' }),
  ],
};
