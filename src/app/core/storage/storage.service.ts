import { Injectable } from '@angular/core';

/** Wrapper de localStorage tolérant aux environnements où il est indisponible. */
@Injectable({ providedIn: 'root' })
export class StorageService {
  get(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  set(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      // stockage indisponible (navigation privée, quota) : l'état reste en mémoire
    }
  }
}
