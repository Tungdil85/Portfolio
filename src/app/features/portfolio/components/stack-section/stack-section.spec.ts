import { TestBed } from '@angular/core/testing';
import { StackSection } from './stack-section';

describe('StackSection', () => {
  it('affiche une ligne par catégorie', async () => {
    const fixture = TestBed.createComponent(StackSection);
    fixture.componentRef.setInput('groups', [
      { category: 'Front', items: 'Angular' },
      { category: 'Tests', items: 'Cypress' },
    ]);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('.stack__row')).toHaveLength(2);
    expect(el.querySelector('.stack__cat')?.textContent).toBe('Front');
    expect(el.querySelector('.stack__items')?.textContent).toBe('Angular');
  });
});
