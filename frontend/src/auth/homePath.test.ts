import { describe, expect, it } from 'vitest';
import { hasRole, homePathFor } from './homePath';

describe('Preusmeritev po prijavi', () => {
  it('administratorja preusmeri na administratorsko stran', () => {
    expect(homePathFor(['admin'])).toBe('/admin');
  });

  it('lastnika in varuha preusmeri na nadzorno ploščo', () => {
    expect(homePathFor(['owner'])).toBe('/');
    expect(homePathFor(['sitter'])).toBe('/');
  });

  it('uporabnik brez vlog nima vloge lastnika', () => {
    expect(hasRole(undefined, 'owner')).toBe(false);
  });
});