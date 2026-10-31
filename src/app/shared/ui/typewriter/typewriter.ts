import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';

/** Machine à écrire : tape puis efface chaque phrase en boucle. */
@Component({
  selector: 'app-typewriter',
  templateUrl: './typewriter.html',
  styleUrl: './typewriter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Typewriter implements OnInit {
  readonly phrases = input.required<readonly string[]>();

  protected readonly typed = signal('');
  protected readonly typing = signal(false);
  protected readonly caret = signal(true);

  private readonly destroyRef = inject(DestroyRef);
  private phrase = 0;
  private count = 0;
  private deleting = false;

  ngOnInit(): void {
    const blink = setInterval(() => this.caret.update((c) => !c), 530);
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      timer = setTimeout(step, this.advance());
    };
    step();
    this.destroyRef.onDestroy(() => {
      clearTimeout(timer);
      clearInterval(blink);
    });
  }

  /** Avance d'un pas et retourne le délai avant le suivant. */
  private advance(): number {
    const phrases = this.phrases();
    if (phrases.length === 0) return 1000;
    const full = phrases[this.phrase];
    let wait: number;
    if (!this.deleting) {
      this.count++;
      wait = 32 + Math.random() * 40;
      if (this.count >= full.length) {
        this.deleting = true;
        wait = 2600;
      }
    } else {
      this.count -= 2;
      wait = 14;
      if (this.count <= 0) {
        this.count = 0;
        this.deleting = false;
        this.phrase = (this.phrase + 1) % phrases.length;
        wait = 400;
      }
    }
    this.typed.set(full.slice(0, this.count));
    this.typing.set(this.count > 0 && this.count < full.length);
    return wait;
  }
}
