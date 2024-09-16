import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { APPSTATE } from '../../../app.state';

@Component({
  selector: 'app-movie-save',
  standalone: true,
  imports: [
  ],
  templateUrl: './save.component.html',
  styleUrl: './save.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveComponent {
  #store = inject(Store<APPSTATE>) as Store<APPSTATE>;
}
