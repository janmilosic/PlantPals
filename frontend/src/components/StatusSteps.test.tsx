import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import StatusSteps from './StatusSteps';

describe('Prikaz statusa varstva', () => {
  it('prikaže vseh 5 korakov in označi trenutni status', () => {
    const { container } = render(<StatusSteps status="v_teku" />);
    expect(container.querySelectorAll('li')).toHaveLength(5);
    expect(container.querySelector('.step-current')?.textContent).toContain('V teku');
  });

  it('pri preklicanem varstvu prikaže sporočilo o preklicu', () => {
    render(<StatusSteps status="preklicano" />);
    expect(screen.getByText('Varstvo je preklicano')).toBeTruthy();
  });
});