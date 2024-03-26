import { ReactNode, createContext, useContext, useMemo, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { CartItem } from '../types/types';

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContext = {
  cartItems: CartItem[];
  getItemQuantity: (id: number) => number;
  incrementItemQuantity: (id: number) => void;
  decrementItemQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  totalCartQuantity: number;
  closeCart: () => void;
  clearCart: () => void;
  isOpen: boolean;
  toggleCart: () => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    'shopping-cart',
    []
  );

  // update this to ensure the item exists
  const totalCartQuantity = cartItems.reduce(
    (total: number, { quantity }: CartItem) => total + quantity,
    0
  );

  const getItemQuantity = (id: number) =>
    cartItems.find((item: CartItem) => item.id === id)?.quantity || 0;

  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen(prev => !prev);

  const incrementItemQuantity = (id: number) => {
    setCartItems((currItems: CartItem[]) => {
      const hasItem =
        currItems.find((item: CartItem) => item.id === id) === undefined;
      if (hasItem) {
        return [...currItems, { id, quantity: 1 }];
      }
      return currItems.map((item: CartItem) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  };

  const decrementItemQuantity = (id: number) => {
    setCartItems((currItems: CartItem[]) => {
      const hasOneQuantity =
        currItems.find(item => item.id === id)?.quantity === 1;
      if (hasOneQuantity) {
        return currItems.filter(item => item.id !== id);
      }
      return currItems.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((currItems: CartItem[]) => {
      const itemToDelete = currItems.find(item => item.id === id);
      if (itemToDelete) {
        return currItems.filter(item => item.id !== id);
      }
      return currItems;
    });
  };

  const clearCart = () => setCartItems([]);

  const value = useMemo(
    () => ({
      cartItems,
      getItemQuantity,
      incrementItemQuantity,
      decrementItemQuantity,
      removeFromCart,
      totalCartQuantity,
      closeCart,
      clearCart,
      isOpen,
      toggleCart,
    }),
    [cartItems, isOpen]
  );

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
}

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (context === undefined) {
    throw new Error(
      'useShoppingCart must be used within a ShoppingCartProvider'
    );
  }
  return context;
};
