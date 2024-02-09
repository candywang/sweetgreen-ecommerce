import GenericButton from '../components/GenericButton';
import { useShoppingCart } from '../context/ShoppingCartContext';

const HomePage = () => {
  const { currentLocation, totalCartQuantity } = useShoppingCart();
  const to = currentLocation ? `/${currentLocation.id}/menu` : '/locations';
  const maybeFinishPickUpOrderButton = totalCartQuantity > 0 && (
    <GenericButton to={to}>Finish up your pickup order</GenericButton>
  );

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <GenericButton to={to}>Order</GenericButton>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>Welcome.</div>
        {maybeFinishPickUpOrderButton}
        <GenericButton to={to}>Order now</GenericButton>
      </div>
    </div>
  );
};

export default HomePage;
