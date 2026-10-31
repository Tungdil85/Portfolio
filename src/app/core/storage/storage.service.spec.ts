import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    localStorage.clear();
    service = TestBed.inject(StorageService);
  });

  afterEach(() => vi.restoreAllMocks());

  it('relit une valeur écrite', () => {
    service.set('k', 'v');
    expect(service.get('k')).toBe('v');
  });

  it('retourne null pour une clé absente', () => {
    expect(service.get('absent')).toBeNull();
  });

  it('ne lève pas quand le stockage est indisponible', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('denied');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('denied');
    });
    expect(service.get('k')).toBeNull();
    expect(() => service.set('k', 'v')).not.toThrow();
  });
});
