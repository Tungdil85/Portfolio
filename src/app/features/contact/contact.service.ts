import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

export interface ContactRequest {
  name: string;
  email: string;
  message: string;
  need: string | null;
}

export const CONTACT_EMAIL = 'simonprouteau85@gmail.com';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly document = inject(DOCUMENT);

  /** Ouvre la messagerie de l'utilisateur avec le message prérempli. */
  send(request: ContactRequest): void {
    this.document.location.href = this.buildMailto(request);
  }

  /** Construit le lien `mailto:` prérempli à partir du formulaire. */
  buildMailto({ name, email, message, need }: ContactRequest): string {
    const topic = need ?? 'Non précisé';
    const body = `${message}\n\n— ${name} (${email})\nBesoin : ${topic}`;
    const subject = `Contact portfolio — ${topic}`;
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}
