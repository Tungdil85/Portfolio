import { computed, inject, Injectable, signal } from '@angular/core';
import { StorageService } from '@core/storage';
import { THEMES, ThemeName } from './theme.model';

const STORAGE_KEY = 'sp-portfolio-c-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storage = inject(StorageService);

  readonly name = signal<ThemeName>(this.readStored());
  readonly theme = computed(() => THEMES[this.name()]);
  readonly toggleLabel = computed(() => (this.name() === 'light' ? 'mode sombre' : 'mode clair'));
  /** Variables CSS à poser sur la racine de la page. */
  readonly cssVars = computed(() => {
    const t = this.theme();
    return { '--bg': t.bg, '--fg': t.fg, '--mut': t.mut, '--line': t.line, '--card': t.card, '--acc': t.acc };
  });

  toggle(): void {
    const next: ThemeName = this.name() === 'light' ? 'dark' : 'light';
    this.storage.set(STORAGE_KEY, next);
    this.name.set(next);
  }

  private readStored(): ThemeName {
    const stored = this.storage.get(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : 'dark';
  }
}
