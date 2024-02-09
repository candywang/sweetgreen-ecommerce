import { createContext, useContext, useState } from 'react';
import ShoppingCart from '../components/ShoppingCart';
import useLocalStorage from '../hooks/useLocalStorage';

const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage('shopping-cart', []);
  const [currentLocation, setCurrentLocation] = useLocalStorage(
    'current-location',
    null
  );
  // update this to ensure the item exists
  const totalCartQuantity = cartItems.reduce(
    (total, { quantity }) => total + quantity,
    0
  );
  const isLimitReached = currentLocation ? totalCartQuantity >= currentLocation.itemLimit : false;

  const getItemQuantity = id =>
    cartItems.find(item => item.id === id)?.quantity || 0;

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const incrementItemQuantity = id => {
    setCartItems(currItems => {
      const hasItem = currItems.find(item => item.id === id) === undefined;
      if (hasItem) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decrementItemQuantity = id => {
    setCartItems(currItems => {
      const hasOneQuantity =
        currItems.find(item => item.id === id)?.quantity === 1;
      if (hasOneQuantity) {
        return currItems.filter(item => item.id !== id);
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeFromCart = id => {
    setCartItems(currItems => {
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
        currentLocation,
        setCurrentLocation,
        clearCart,
        isLimitReached,
        isOpen,
      }}
    >
      <ShoppingCart isOpen={isOpen} />
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => useContext(ShoppingCartContext);
