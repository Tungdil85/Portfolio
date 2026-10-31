import { TestBed } from '@angular/core/testing';
import { PortfolioService } from './portfolio.service';

describe('PortfolioService', () => {
  const content = () => TestBed.inject(PortfolioService).content;

  it('expose le profil', () => {
    expect(content().profile.name).toBe('Simon Prouteau');
  });

  it('expose une entrée de navigation par section', () => {
    expect(content().nav.map((n) => n.id)).toEqual([
      'offre',
      'projets',
      'marchlords',
      'stack',
      'parcours',
      'contact',
    ]);
  });

  it('fournit du contenu pour chaque section', () => {
    const c = content();
    expect(c.offers).toHaveLength(4);
    expect(c.projects.length).toBeGreaterThan(0);
    expect(c.stack.length).toBeGreaterThan(0);
    expect(c.experiences.length).toBeGreaterThan(0);
    expect(c.phrases.length).toBeGreaterThan(0);
  });
});
