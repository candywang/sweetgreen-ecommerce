import { ReactNode, createContext, useContext, useState } from 'react';
import ShoppingCart from '../components/ShoppingCart';
import useLocalStorage from '../hooks/useLocalStorage';

type ShoppingCartProviderProps = {
  children: ReactNode;
};

export type CartItem = {
  id: number;
  quantity: number;
};

type ShoppingCartContext = {
  cartItems: CartItem[];
  getItemQuantity: (id: number) => number;
  incrementItemQuantity: (id: number) => void;
  decrementItemQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  totalCartQuantity: number;
  openCart: () => void;
  closeCart: () => void;
  clearCart: () => void;
  isOpen: boolean;
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

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

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

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        getItemQuantity,
        incrementItemQuantity,
        decrementItemQuantity,
        removeFromCart,
        totalCartQuantity,
        openCart,
        closeCart,
        clearCart,
        isOpen,
      }}
    >
      <ShoppingCart isOpen={isOpen} />
      {children}
    </ShoppingCartContext.Provider>
  );
}

export const useShoppingCart = () => useContext(ShoppingCartContext);