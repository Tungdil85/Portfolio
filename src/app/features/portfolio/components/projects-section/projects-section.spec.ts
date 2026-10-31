import { TestBed } from '@angular/core/testing';
import { ProjectsSection } from './projects-section';

describe('ProjectsSection', () => {
  it('affiche une carte par projet', async () => {
    const fixture = TestBed.createComponent(ProjectsSection);
    fixture.componentRef.setInput('projects', [
      { name: 'P1', client: 'C1', year: '2024', description: 'd1', tech: 't1' },
      { name: 'P2', client: 'C2', year: '2025', description: 'd2', tech: 't2' },
    ]);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('#projets')).toBeTruthy();
    expect(el.querySelectorAll('.project')).toHaveLength(2);
    expect(el.querySelector('.project__name')?.textContent).toBe('P1');
    expect(el.querySelector('.project__tech')?.textContent).toBe('t1');
  });
});
