import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SectionHeading } from '@shared/ui';
import { Experience } from '../../models/portfolio.model';

@Component({
  selector: 'app-experience-section',
  imports: [SectionHeading],
  templateUrl: './experience-section.html',
  styleUrl: './experience-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceSection {
  readonly experiences = input.required<readonly Experience[]>();
}
