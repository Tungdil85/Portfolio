import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { ViewportService } from './viewport.service';

function stubMatchMedia(matches: boolean) {
  let listener: ((e: MediaQueryListEvent) => void) | undefined;
  const mq = {
    matches,
    addEventListener: (_: string, l: (e: MediaQueryListEvent) => void) => (listener = l),
    removeEventListener: vi.fn(),
  };
  vi.stubGlobal('matchMedia', () => mq);
  return { mq, emit: (m: boolean) => listener?.({ matches: m } as MediaQueryListEvent) };
}

describe('ViewportService', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('lit la media query initiale', () => {
    stubMatchMedia(true);
    expect(TestBed.inject(ViewportService).wide()).toBe(true);
  });

  it('suit les changements de taille', () => {
    const { emit } = stubMatchMedia(false);
    const service = TestBed.inject(ViewportService);
    expect(service.wide()).toBe(false);
    emit(true);
    expect(service.wide()).toBe(true);
  });

  it('retire son écouteur à la destruction', () => {
    const { mq } = stubMatchMedia(false);
    TestBed.inject(ViewportService);
    TestBed.resetTestingModule();
    expect(mq.removeEventListener).toHaveBeenCalled();
  });
});
