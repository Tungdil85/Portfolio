import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { ViewportService } from '@core/viewport';
import { Home } from './home';

describe('Home', () => {
  async function setup(wide: boolean) {
    TestBed.configureTestingModule({
      providers: [{ provide: ViewportService, useValue: { wide: () => wide } }],
    });
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    return { fixture, el: fixture.nativeElement as HTMLElement };
  }

  afterEach(() => {
    document.body.style.overflow = '';
    vi.restoreAllMocks();
  });

  it('compose toutes les sections', async () => {
    const { el } = await setup(true);
    for (const id of ['offre', 'projets', 'marchlords', 'stack', 'parcours', 'contact']) {
      expect(el.querySelector('#' + id), id).toBeTruthy();
    }
  });

  it('n’affiche l’en-tête mobile qu’en petit écran', async () => {
    expect((await setup(true)).el.querySelector('app-mobile-header')).toBeNull();
    TestBed.resetTestingModule();
    expect((await setup(false)).el.querySelector('app-mobile-header')).toBeTruthy();
  });

  it('ouvre le menu mobile et bloque le défilement, puis le referme', async () => {
    const { fixture, el } = await setup(false);
    el.querySelector<HTMLButtonElement>('.bar__burger')!.click();
    await fixture.whenStable();
    expect(el.querySelector('.side--hidden')).toBeNull();
    expect(document.body.style.overflow).toBe('hidden');
    el.querySelector<HTMLButtonElement>('.close')!.click();
    await fixture.whenStable();
    expect(el.querySelector('.side--hidden')).toBeTruthy();
    expect(document.body.style.overflow).toBe('');
  });

  it('applique les variables du thème sur l’hôte', async () => {
    const { el } = await setup(true);
    expect(el.style.getPropertyValue('--bg')).toBe('#0c0714');
  });
});
