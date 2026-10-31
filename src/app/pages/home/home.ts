import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { MobileHeader } from '../../components/mobile-header/mobile-header';
import { SiteSidebar } from '../../components/site-sidebar/site-sidebar';
import { ThemeService } from '@core/theme';
import { ViewportService } from '@core/viewport';
import { ContactForm } from '@features/contact';
import {
  ExperienceSection,
  OffersSection,
  PortfolioService,
  ProjectsSection,
  SideProjectsSection,
  StackSection,
} from '@features/portfolio';

@Component({
  selector: 'app-home',
  imports: [
    MobileHeader,
    SiteSidebar,
    OffersSection,
    ProjectsSection,
    SideProjectsSection,
    StackSection,
    ExperienceSection,
    ContactForm,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[style]': 'theme.cssVars()' },
})
export class Home {
  protected readonly theme = inject(ThemeService);
  protected readonly viewport = inject(ViewportService);
  protected readonly content = inject(PortfolioService).content;
  protected readonly menuOpen = signal(false);

  private readonly document = inject(DOCUMENT);

  constructor() {
    effect(() => {
      const locked = this.menuOpen() && !this.viewport.wide();
      this.document.body.style.overflow = locked ? 'hidden' : '';
    });
    inject(DestroyRef).onDestroy(() => (this.document.body.style.overflow = ''));
  }
}
