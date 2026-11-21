import { describe, expect, it } from '@jest/globals';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../users/user-role.enum';
import { RolesGuard } from './roles.guard';

function requestFromUser(roles: UserRole[]): ExecutionContext {
  return {
    getHandler: () => undefined,
    getClass: () => undefined,
    switchToHttp: () => ({
      getRequest: () => ({ user: { userId: '1', email: 'test@plantpals.si', roles } }),
    }),
  } as unknown as ExecutionContext;
}

function guardForRoute(requiredRoles: UserRole[]) {
  const reflector = { getAllAndOverride: () => requiredRoles } as unknown as Reflector;
  return new RolesGuard(reflector);
}

describe('Preverjanje vlog uporabnika', () => {
  it('lastniku dovoli dostop do poti za lastnike', () => {
    const guard = guardForRoute([UserRole.Owner]);
    expect(guard.canActivate(requestFromUser([UserRole.Owner]))).toBe(true);
  });

  it('varuhu zavrne dostop do poti za lastnike (HTTP 403)', () => {
    const guard = guardForRoute([UserRole.Owner]);
    expect(() => guard.canActivate(requestFromUser([UserRole.Sitter]))).toThrow(ForbiddenException);
  });
});