import { TestBed } from '@angular/core/testing';
import { HexGrid } from './hex-grid';

describe('HexGrid', () => {
  it('se monte avec un canvas décoratif sans WebGL', async () => {
    const fixture = TestBed.createComponent(HexGrid);
    await fixture.whenStable();
    const canvas = (fixture.nativeElement as HTMLElement).querySelector('canvas');
    expect(canvas).toBeTruthy();
    expect(canvas?.getAttribute('aria-hidden')).toBe('true');
  });

  it('se détruit sans erreur', async () => {
    const fixture = TestBed.createComponent(HexGrid);
    await fixture.whenStable();
    expect(() => fixture.destroy()).not.toThrow();
  });
});
