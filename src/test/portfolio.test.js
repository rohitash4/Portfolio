import { describe, it, expect } from 'vitest';
import { portfolio } from '../data/portfolio.js';

describe('Portfolio', () => {
  it('has valid portfolio data structure', () => {
    expect(portfolio).toBeDefined();
    expect(portfolio.name).toBe('Rohit Varma');
    expect(portfolio.role).toBe('Creative Developer');
    expect(portfolio.projects).toBeInstanceOf(Array);
    expect(portfolio.skills).toBeDefined();
    expect(portfolio.experience).toBeInstanceOf(Array);
  });
});
