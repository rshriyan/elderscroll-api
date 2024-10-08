import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Card} from '../../store/state';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {

  @Input() card!: Card;

}
