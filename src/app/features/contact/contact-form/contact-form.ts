import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactForm {
  private readonly contact = inject(ContactService);

  protected readonly needs = ['Nouveau produit', 'Renfort équipe', 'Refonte / migration'] as const;
  protected readonly need = signal<string | null>(null);
  protected readonly sent = signal(false);

  protected pick(label: string): void {
    this.need.update((current) => (current === label ? null : label));
  }

  protected submit(event: SubmitEvent): void {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    this.contact.send({
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      message: String(data.get('message') ?? ''),
      need: this.need(),
    });
    this.sent.set(true);
  }
}
