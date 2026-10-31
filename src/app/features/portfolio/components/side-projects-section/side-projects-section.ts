import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SectionHeading } from '@shared/ui';
import { LinkedProject, SideProject } from '../../models/portfolio.model';

@Component({
  selector: 'app-side-projects-section',
  imports: [SectionHeading],
  templateUrl: './side-projects-section.html',
  styleUrl: './side-projects-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideProjectsSection {
  readonly featured = input.required<SideProject>();
  readonly linked = input.required<LinkedProject>();
  readonly githubUrl = input.required<string>();
}
