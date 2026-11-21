import { AxiosError, AxiosHeaders } from 'axios';
import { describe, expect, it } from 'vitest';
import { getErrorMessages } from './errors';

function serverError(data: unknown) {
  const config = { headers: new AxiosHeaders() };
  return new AxiosError('Napaka', '400', config, null, {
    data,
    status: 400,
    statusText: 'Bad Request',
    headers: {},
    config,
  });
}

describe('Sporočila o napakah', () => {
  it('prikaže vsa sporočila, ki jih vrne validacija na strežniku', () => {
    const error = serverError({ message: ['Ime rastline je obvezno', 'Pogostost zalivanja je obvezna'] });
    expect(getErrorMessages(error)).toEqual(['Ime rastline je obvezno', 'Pogostost zalivanja je obvezna']);
  });

  it('javi, da strežnik ni dosegljiv, ko odgovora ni', () => {
    const error = new AxiosError('Network Error');
    expect(getErrorMessages(error)[0]).toContain('Strežnik ni dosegljiv');
  });

  it('pri neznani napaki prikaže splošno sporočilo', () => {
    expect(getErrorMessages(new Error('neznana napaka'))).toEqual(['Prišlo je do nepričakovane napake.']);
  });
});