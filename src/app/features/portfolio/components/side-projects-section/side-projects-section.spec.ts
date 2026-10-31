import { TestBed } from '@angular/core/testing';
import { SideProjectsSection } from './side-projects-section';

describe('SideProjectsSection', () => {
  async function setup() {
    const fixture = TestBed.createComponent(SideProjectsSection);
    fixture.componentRef.setInput('featured', {
      name: 'Marchlords',
      period: '2024',
      url: 'https://marchlords.com',
      description: 'desc',
      points: ['p1', 'p2'],
    });
    fixture.componentRef.setInput('linked', {
      name: 'Interviews',
      url: 'https://i.example',
      displayUrl: 'i.example',
      description: 'd',
    });
    fixture.componentRef.setInput('githubUrl', 'https://github.com/x');
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('affiche le projet principal et ses points', async () => {
    const el = await setup();
    expect(el.querySelector('.featured__name')?.textContent).toBe('Marchlords');
    expect(el.querySelectorAll('.featured__points li')).toHaveLength(2);
    expect(el.querySelector('.btn--brand')?.textContent?.trim()).toBe('marchlords.com ↗');
  });

  it('lie le site, GitHub et le second projet', async () => {
    const el = await setup();
    expect(el.querySelector('.btn--brand')?.getAttribute('href')).toBe('https://marchlords.com');
    expect(el.querySelector('.btn--ghost')?.getAttribute('href')).toBe('https://github.com/x');
    expect(el.querySelector('.linked')?.getAttribute('href')).toBe('https://i.example');
  });
});
