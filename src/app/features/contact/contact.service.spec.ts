import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { CONTACT_EMAIL, ContactService } from './contact.service';

describe('ContactService', () => {
  const service = () => TestBed.inject(ContactService);
  const parse = (href: string) => new URL(href);

  it('construit un mailto vers la bonne adresse', () => {
    const url = parse(service().buildMailto({ name: 'Ada', email: 'ada@x.fr', message: 'Bonjour', need: 'Renfort équipe' }));
    expect(url.protocol).toBe('mailto:');
    expect(url.pathname).toBe(CONTACT_EMAIL);
    expect(url.searchParams.get('subject')).toBe('Contact portfolio — Renfort équipe');
    expect(url.searchParams.get('body')).toBe('Bonjour\n\n— Ada (ada@x.fr)\nBesoin : Renfort équipe');
  });

  it('indique « Non précisé » sans besoin choisi', () => {
    const url = parse(service().buildMailto({ name: 'A', email: 'a@b.c', message: 'm', need: null }));
    expect(url.searchParams.get('subject')).toBe('Contact portfolio — Non précisé');
  });

  it('encode les caractères spéciaux', () => {
    const href = service().buildMailto({ name: 'A&B', email: 'a@b.c', message: 'x=1&y=2', need: null });
    expect(href).not.toContain('x=1&y=2');
    expect(parse(href).searchParams.get('body')).toContain('x=1&y=2');
  });

  it('send ouvre le mailto dans la page', () => {
    const doc = { location: { href: '' } };
    TestBed.configureTestingModule({ providers: [{ provide: DOCUMENT, useValue: doc }] });
    TestBed.inject(ContactService).send({ name: 'A', email: 'a@b.c', message: 'm', need: null });
    expect(doc.location.href).toContain('mailto:' + CONTACT_EMAIL);
  });
});
