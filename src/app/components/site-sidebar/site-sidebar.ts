import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { ThemeService } from '@core/theme';
import { ViewportService } from '@core/viewport';
import { HexGrid } from '../hex-grid/hex-grid';

export interface SidebarNavItem {
  id: string;
  label: string;
}

export interface SidebarProfile {
  name: string;
  tagline: string;
  availability: string;
  cvUrl: string;
}

@Component({
  selector: 'app-site-sidebar',
  imports: [HexGrid],
  templateUrl: './site-sidebar.html',
  styleUrl: './site-sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteSidebar {
  readonly profile = input.required<SidebarProfile>();
  readonly nav = input.required<readonly SidebarNavItem[]>();
  /** Menu plein écran ouvert (mobile uniquement). */
  readonly open = input(false);
  readonly closed = output<void>();

  protected readonly theme = inject(ThemeService);
  private readonly viewport = inject(ViewportService);
  protected readonly overlay = computed(() => !this.viewport.wide());
}
