import { describe, expect, it } from '@jest/globals';
import { AssignmentStatus } from './assignment-status.enum';
import { findTransition } from './assignment-transitions';

// US-09: dovoljeni prehodi statusov varstva in kdo jih sme izvesti
describe('Prehodi statusov varstva', () => {
  it('lastnik lahko sprejme zahtevo (iz zahtevano v sprejeto)', () => {
    const rule = findTransition(AssignmentStatus.Requested, AssignmentStatus.Accepted);
    expect(rule?.actor).toBe('owner');
  });

  it('varuh lahko začne varstvo (iz sprejeto v v teku)', () => {
    const rule = findTransition(AssignmentStatus.Accepted, AssignmentStatus.InProgress);
    expect(rule?.actor).toBe('sitter');
  });

  it('potrjenega varstva ni mogoče vrniti nazaj v status v teku', () => {
    const rule = findTransition(AssignmentStatus.Confirmed, AssignmentStatus.InProgress);
    expect(rule).toBeUndefined();
  });
});