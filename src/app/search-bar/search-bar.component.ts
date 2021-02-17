import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent {

  @Input()
  totalCardsCount!: number | null;

  @Input()
  loadedCardsCount!: number | null;

  @Output()
  query: EventEmitter<string> = new EventEmitter<string>();

}
