import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import RestaurantContainer from '../components/RestaurantContainer';

function OrderPage() {
  const { location } = useParams();
  const { storeMenu, updateLocation, error, isLoading, currentLocation } =
    useStore();

  useEffect(() => {
    if (!currentLocation || currentLocation?.id !== location) {
      location && updateLocation(location);
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <RestaurantContainer restaurantMenu={storeMenu} />;
}

export default OrderPage;
