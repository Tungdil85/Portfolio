import { TestBed } from '@angular/core/testing';
import { ExperienceSection } from './experience-section';

describe('ExperienceSection', () => {
  it('affiche une étape par expérience', async () => {
    const fixture = TestBed.createComponent(ExperienceSection);
    fixture.componentRef.setInput('experiences', [
      { period: '2023', role: 'Lead', company: 'Acme', place: 'Paris', description: 'd' },
      { period: '2016', role: 'Stage', company: 'Beta', place: 'Lyon', description: 'e' },
    ]);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('.xp__item')).toHaveLength(2);
    expect(el.querySelector('.xp__role')?.textContent).toBe('Lead — Acme');
  });
});
