import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { fetchMenu, fetchLocation } from '../services/mockApi';
import { useShoppingCart } from './ShoppingCartContext';
import { LocationMenu, Location } from '../types/types';
import useLocalStorage from '../hooks/useLocalStorage';

type StoreProviderProps = {
  children: ReactNode;
};

type StoreContext = {
  currentLocation: Location | null;
  storeMenu: LocationMenu;
  isLoading: boolean;
  error: any;
  updateLocation: (id: string) => void;
};

const StoreContext = createContext({} as StoreContext);

export function StoreProvider({ children }: StoreProviderProps) {
  const [storeMenu, setStoreMenu] = useState<LocationMenu>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] =
    useLocalStorage<Location | null>('current-location', null);
  const [error, setError] = useState<any>(null);
  const { clearCart } = useShoppingCart();

  useEffect(() => {
    const fetchMenuData = async () => {
      setIsLoading(true);
      try {
        const menu = currentLocation && (await fetchMenu(currentLocation.id));
        if (menu) {
          setStoreMenu(menu);
        }
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

  const updateLocation = async (id: string) => {
    try {
      setIsLoading(true);
      const newLocationInfo = await fetchLocation(id);
      clearCart();
      setCurrentLocation(newLocationInfo);
    } catch (err) {
      setError(err);
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
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
