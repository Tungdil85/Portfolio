import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

const WIDE_QUERY = '(min-width: 960px)';

@Injectable({ providedIn: 'root' })
export class ViewportService {
  /** `true` à partir de 960px : sidebar fixe plutôt que menu plein écran. */
  readonly wide = signal(false);

  constructor() {
    const mq = inject(DOCUMENT).defaultView?.matchMedia?.(WIDE_QUERY);
    if (!mq) return;
    this.wide.set(mq.matches);
    const onChange = (e: MediaQueryListEvent) => this.wide.set(e.matches);
    mq.addEventListener('change', onChange);
    inject(DestroyRef).onDestroy(() => mq.removeEventListener('change', onChange));
  }
}
