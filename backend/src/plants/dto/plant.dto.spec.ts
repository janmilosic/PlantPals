import { describe, expect, it } from '@jest/globals';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { PlantDto } from './plant.dto';

async function errorsFor(data: object) {
  const dto = plainToInstance(PlantDto, data);
  const errors = await validate(dto);
  return errors.map((error) => error.property);
}

describe('Validacija rastline', () => {
  it('sprejme rastlino z vsemi pravilnimi podatki', async () => {
    const errors = await errorsFor({ name: 'Fikus', species: 'Ficus', wateringFrequencyDays: 7 });
    expect(errors).toEqual([]);
  });

  it('zavrne rastlino brez imena', async () => {
    const errors = await errorsFor({ name: '   ', wateringFrequencyDays: 7 });
    expect(errors).toContain('name');
  });

  it('zavrne pogostost zalivanja, ki ni pozitivno celo število', async () => {
    expect(await errorsFor({ name: 'Fikus', wateringFrequencyDays: 0 })).toContain('wateringFrequencyDays');
    expect(await errorsFor({ name: 'Fikus', wateringFrequencyDays: 2.5 })).toContain('wateringFrequencyDays');
  });
});