import { useShoppingCart } from '../context/ShoppingCartContext';
import GenericButton from './GenericButton';

const OrderNowButton = ({ color = 'primary', ...props }) => {
  const { currentLocation } = useShoppingCart();
  const to = currentLocation ? `/${currentLocation.id}/menu` : '/locations';

  return (
    <GenericButton to={to} color={color} {...props}>
      <div>Order Now</div>
    </GenericButton>
  );
};

export default OrderNowButton;
