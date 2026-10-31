import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SectionHeading } from '@shared/ui';
import { StackGroup } from '../../models/portfolio.model';

@Component({
  selector: 'app-stack-section',
  imports: [SectionHeading],
  templateUrl: './stack-section.html',
  styleUrl: './stack-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackSection {
  readonly groups = input.required<readonly StackGroup[]>();
}
