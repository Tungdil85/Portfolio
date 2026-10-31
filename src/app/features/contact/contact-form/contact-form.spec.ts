import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { ContactService } from '../contact.service';
import { ContactForm } from './contact-form';

describe('ContactForm', () => {
  const send = vi.fn();

  async function setup() {
    send.mockClear();
    TestBed.configureTestingModule({ providers: [{ provide: ContactService, useValue: { send } }] });
    const fixture = TestBed.createComponent(ContactForm);
    await fixture.whenStable();
    return { fixture, el: fixture.nativeElement as HTMLElement };
  }

  it('se monte avec trois choix de besoin non sélectionnés', async () => {
    const { el } = await setup();
    expect(el.querySelectorAll('.chip')).toHaveLength(3);
    expect(el.querySelectorAll('.chip--on')).toHaveLength(0);
  });

  it('sélectionne puis désélectionne un besoin', async () => {
    const { fixture, el } = await setup();
    const chip = el.querySelector<HTMLButtonElement>('.chip')!;
    chip.click();
    await fixture.whenStable();
    expect(chip.getAttribute('aria-pressed')).toBe('true');
    chip.click();
    await fixture.whenStable();
    expect(chip.getAttribute('aria-pressed')).toBe('false');
  });

  it('transmet le formulaire au service et confirme l’envoi', async () => {
    const { fixture, el } = await setup();
    el.querySelector<HTMLInputElement>('[name=name]')!.value = 'Ada';
    el.querySelector<HTMLInputElement>('[name=email]')!.value = 'ada@x.fr';
    el.querySelector<HTMLTextAreaElement>('[name=message]')!.value = 'Salut';
    el.querySelector<HTMLButtonElement>('.chip')!.click();
    el.querySelector('form')!.dispatchEvent(new SubmitEvent('submit', { cancelable: true }));
    await fixture.whenStable();
    expect(send).toHaveBeenCalledWith({
      name: 'Ada',
      email: 'ada@x.fr',
      message: 'Salut',
      need: 'Nouveau produit',
    });
    expect(el.querySelector('.form__status')?.textContent).toContain('Merci');
  });
});
