import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-ghost',
  templateUrl: './ghost.component.html',
  styleUrls: ['./ghost.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GhostComponent {

  @Input()
  Visible!: boolean;

}
