import { createContext, useContext, useState, useEffect } from 'react';
import { fetchMenu, fetchLocation } from '../services/mockApi';
import { useShoppingCart } from './ShoppingCartContext';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [storeMenu, setStoreMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { clearCart, currentLocation, setCurrentLocation } = useShoppingCart();
  const maxStoreQuantity = currentLocation?.itemLimit;

  useEffect(() => {
    const fetchMenuData = async () => {
      setIsLoading(true);
      try {
        const menu = await fetchMenu(currentLocation.id);
        setStoreMenu(menu);
        setError(null);
      } catch (err) {
        setError('Failed to fetch menu items');
        setStoreMenu([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuData();
  }, [currentLocation]);

  const updateLocation = async locationId => {
    try {
      setIsLoading(true);
      const newLocationInfo = await fetchLocation(locationId);
      clearCart();
      setCurrentLocation(newLocationInfo);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        currentLocation,
        storeMenu,
        isLoading,
        error,
        updateLocation,
        maxStoreQuantity,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
