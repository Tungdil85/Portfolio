import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { ViewportService } from '@core/viewport';
import { SiteSidebar } from './site-sidebar';

const profile = { name: 'Simon', tagline: 'Dev', availability: 'Dispo', cvUrl: 'cv.pdf' };
const nav = [
  { id: 'a', label: 'A' },
  { id: 'b', label: 'B' },
];

describe('SiteSidebar', () => {
  async function setup(wide: boolean, open = false) {
    TestBed.configureTestingModule({
      providers: [{ provide: ViewportService, useValue: { wide: () => wide } }],
    });
    const fixture = TestBed.createComponent(SiteSidebar);
    fixture.componentRef.setInput('profile', profile);
    fixture.componentRef.setInput('nav', nav);
    fixture.componentRef.setInput('open', open);
    await fixture.whenStable();
    return { fixture, el: fixture.nativeElement as HTMLElement };
  }

  it('affiche le profil et la navigation numérotée', async () => {
    const { el } = await setup(true);
    expect(el.querySelector('h1')?.textContent).toBe('Simon');
    const links = el.querySelectorAll('.nav__link');
    expect(links).toHaveLength(2);
    expect(links[1].getAttribute('href')).toBe('#b');
    expect(links[1].querySelector('.nav__num')?.textContent).toBe('02');
  });

  it('reste visible sans bouton de fermeture en mode large', async () => {
    const { el } = await setup(true);
    expect(el.querySelector('.side--hidden')).toBeNull();
    expect(el.querySelector('.close')).toBeNull();
  });

  it('est masquée en mobile tant que le menu est fermé', async () => {
    const { el } = await setup(false, false);
    expect(el.querySelector('.side--hidden')).toBeTruthy();
  });

  it('émet closed au clic sur ×, sur un lien et sur Me contacter', async () => {
    const { fixture, el } = await setup(false, true);
    const spy = vi.fn();
    fixture.componentInstance.closed.subscribe(spy);
    el.querySelector<HTMLButtonElement>('.close')!.click();
    el.querySelector<HTMLAnchorElement>('.nav__link')!.click();
    el.querySelector<HTMLAnchorElement>('.cta--solid')!.click();
    expect(spy).toHaveBeenCalledTimes(3);
  });

  it('bascule le thème via le bouton', async () => {
    const { fixture, el } = await setup(true);
    const before = fixture.componentInstance['theme'].name();
    el.querySelector<HTMLButtonElement>('.pill')!.click();
    expect(fixture.componentInstance['theme'].name()).not.toBe(before);
  });
});
