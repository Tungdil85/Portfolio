import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SectionHeading } from '@shared/ui';
import { Project } from '../../models/portfolio.model';

@Component({
  selector: 'app-projects-section',
  imports: [SectionHeading],
  templateUrl: './projects-section.html',
  styleUrl: './projects-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsSection {
  readonly projects = input.required<readonly Project[]>();
}
