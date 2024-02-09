import { formatLocationName, formatPrice } from './format';
import { describe, expect, it } from 'vitest';

describe('#formatLocationName', () => {
  it('returns name without hyphens and capitilazies first character in each word', () => {
    expect(formatLocationName('culver-city')).toBe('Culver City');
  });

  it('returns an empty string with no argument', () => {
    expect(formatLocationName()).toBe('');
  });

  it('returns an empty string with empty string', () => {
    expect(formatLocationName('')).toBe('');
  });
});

describe('#formatPrice', () => {
  it('returns price as a string with $ prepended', () => {
    expect(formatPrice(16.95)).toBe('$16.95');
  });

  it('returns price as a string with $ prepended and decimal to the hundredths', () => {
    expect(formatPrice(5)).toBe('$5.00');
    expect(formatPrice(17.8)).toBe('$17.80');
    expect(formatPrice(23.5)).toBe('$23.50');
    expect(formatPrice(15.555)).toBe('$15.56');
    expect(formatPrice(15.554)).toBe('$15.55');
  });
});
