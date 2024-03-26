import { describe, expect, it, beforeEach } from 'vitest';
import checkCartItems from './reward';
import { CartItem } from '../types/types';

describe('#checkCartItems', () => {
  let cartItems: CartItem[];

  beforeEach(() => {
    cartItems = [
      { id: 1, quantity: 5 },
      { id: 2, quantity: 5 },
    ];
  });

  it('returns a boolean regardless of input', () => {
    expect(typeof checkCartItems([], cartItems)).toBe('boolean');
  });

  it.each([
    { cart: [1], expected: true },
    { cart: [1, 2], expected: true },
    { cart: [1, 2, 3, 4, 5], expected: true },
    { cart: [3], expected: false },
  ])('returns $expected when cart items are $cart', ({ cart, expected }) => {
    expect(checkCartItems(cart, cartItems)).toStrictEqual(expected);
  });
});
