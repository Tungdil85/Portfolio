import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => localStorage.clear());

  it('démarre en sombre par défaut', () => {
    const service = TestBed.inject(ThemeService);
    expect(service.name()).toBe('dark');
    expect(service.toggleLabel()).toBe('mode clair');
  });

  it('reprend le thème stocké', () => {
    localStorage.setItem('sp-portfolio-c-theme', 'light');
    const service = TestBed.inject(ThemeService);
    expect(service.name()).toBe('light');
    expect(service.cssVars()['--bg']).toBe('#faf8fc');
  });

  it('ignore une valeur stockée invalide', () => {
    localStorage.setItem('sp-portfolio-c-theme', 'neon');
    expect(TestBed.inject(ThemeService).name()).toBe('dark');
  });

  it('bascule et persiste le choix', () => {
    const service = TestBed.inject(ThemeService);
    service.toggle();
    expect(service.name()).toBe('light');
    expect(service.toggleLabel()).toBe('mode sombre');
    expect(localStorage.getItem('sp-portfolio-c-theme')).toBe('light');
    service.toggle();
    expect(service.name()).toBe('dark');
  });
});
