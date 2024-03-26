import { CartItem } from '../types/types';

const checkCartItems = (rewardIds: number[], cartItems: CartItem[]) =>
  cartItems.some(cartItem => rewardIds.includes(cartItem.id));

export default checkCartItems;
