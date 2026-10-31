import { TestBed } from '@angular/core/testing';
import { SectionHeading } from './section-heading';

describe('SectionHeading', () => {
  it('affiche le titre et le numéro', async () => {
    const fixture = TestBed.createComponent(SectionHeading);
    fixture.componentRef.setInput('title', 'Stack');
    fixture.componentRef.setInput('index', '04');
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h2')?.textContent).toBe('Stack');
    expect(el.querySelector('.heading__index')?.textContent).toBe('04');
  });
});
