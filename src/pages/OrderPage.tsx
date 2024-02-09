import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useShoppingCart } from '../context/ShoppingCartContext';
import RestaurantContainer from '../components/RestaurantContainer';

const OrderPage = () => {
  const { location } = useParams();
  const { storeMenu, updateLocation, error, isLoading } = useStore();
  const { currentLocation } = useShoppingCart();

  useEffect(() => {
    if (!currentLocation || currentLocation?.id !== location) {
      updateLocation(location);
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <RestaurantContainer restaurantMenu={storeMenu} />;
};

export default OrderPage;
