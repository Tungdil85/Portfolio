import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { Typewriter } from './typewriter';

describe('Typewriter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(Math, 'random').mockReturnValue(0);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  function setup(phrases: string[]) {
    const fixture = TestBed.createComponent(Typewriter);
    fixture.componentRef.setInput('phrases', phrases);
    fixture.detectChanges();
    return fixture;
  }

  const visible = (f: ReturnType<typeof setup>) =>
    (f.nativeElement as HTMLElement).querySelector('[aria-hidden]')?.textContent ?? '';

  it('tape la phrase lettre par lettre', () => {
    const fixture = setup(['abc']);
    fixture.detectChanges();
    expect(visible(fixture)).toBe('a');
    vi.advanceTimersByTime(40);
    fixture.detectChanges();
    expect(visible(fixture)).toBe('ab');
    vi.advanceTimersByTime(100);
    fixture.detectChanges();
    expect(visible(fixture)).toBe('abc');
  });

  it("efface puis passe à la phrase suivante", () => {
    const fixture = setup(['ab', 'xy']);
    vi.advanceTimersByTime(3000);
    fixture.detectChanges();
    expect(visible(fixture)).toBe('');
    vi.advanceTimersByTime(600);
    fixture.detectChanges();
    expect(visible(fixture)).toContain('x');
  });

  it('expose la première phrase aux lecteurs d’écran', () => {
    const fixture = setup(['bonjour']);
    expect((fixture.nativeElement as HTMLElement).querySelector('.sr-only')?.textContent).toBe('bonjour');
  });

  it('ne plante pas sans phrase et nettoie ses timers', () => {
    const fixture = setup([]);
    expect(() => vi.advanceTimersByTime(2000)).not.toThrow();
    fixture.destroy();
    expect(vi.getTimerCount()).toBe(0);
  });
});
