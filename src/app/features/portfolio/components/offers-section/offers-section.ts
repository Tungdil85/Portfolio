import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Typewriter } from '@shared/ui';
import { Offer } from '../../models/portfolio.model';

@Component({
  selector: 'app-offers-section',
  imports: [Typewriter],
  templateUrl: './offers-section.html',
  styleUrl: './offers-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffersSection {
  readonly intro = input.required<string>();
  readonly phrases = input.required<readonly string[]>();
  readonly offers = input.required<readonly Offer[]>();
}
