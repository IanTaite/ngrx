import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieListComponent } from './movies/components/movie-list/movie-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MovieListComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
}
