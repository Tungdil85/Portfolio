import { TestBed } from '@angular/core/testing';
import { MobileHeader } from './mobile-header';

describe('MobileHeader', () => {
  it('émet à l’ouverture du menu', async () => {
    const fixture = TestBed.createComponent(MobileHeader);
    let opened = 0;
    fixture.componentInstance.menuOpened.subscribe(() => opened++);
    await fixture.whenStable();
    (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('.bar__burger')!.click();
    expect(opened).toBe(1);
  });

  it('affiche le nom et un lien vers l’accueil', async () => {
    const fixture = TestBed.createComponent(MobileHeader);
    await fixture.whenStable();
    const brand = (fixture.nativeElement as HTMLElement).querySelector('.bar__brand');
    expect(brand?.textContent).toBe('Simon Prouteau');
    expect(brand?.getAttribute('href')).toBe('#offre');
  });
});
