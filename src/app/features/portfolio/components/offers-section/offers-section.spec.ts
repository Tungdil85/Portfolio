import { TestBed } from '@angular/core/testing';
import { OffersSection } from './offers-section';

describe('OffersSection', () => {
  it('affiche l’accroche et une carte par offre', async () => {
    const fixture = TestBed.createComponent(OffersSection);
    fixture.componentRef.setInput('intro', 'Dix ans sur Angular.');
    fixture.componentRef.setInput('phrases', ['Une phrase.']);
    fixture.componentRef.setInput('offers', [
      { title: 'A', description: 'da' },
      { title: 'B', description: 'db' },
    ]);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('#offre')).toBeTruthy();
    expect(el.querySelector('.offers__intro')?.textContent).toContain('Dix ans sur Angular.');
    expect(el.querySelectorAll('.offer')).toHaveLength(2);
    expect(el.querySelector('.offer__num')?.textContent).toBe('01');
  });
});
