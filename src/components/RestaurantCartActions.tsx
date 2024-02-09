import { useShoppingCart } from '../context/ShoppingCartContext';
import CartActions from './CartActions';

const RestaurantCartActions = ({ id, quantity }) => {
  const {
    decrementItemQuantity,
    incrementItemQuantity,
    removeFromCart,
    isLimitReached,
  } = useShoppingCart();

  return (
    <CartActions
      id={id}
      quantity={quantity}
      decrementItemQuantity={decrementItemQuantity}
      incrementItemQuantity={incrementItemQuantity}
      removeFromCart={removeFromCart}
      isDisabled={isLimitReached}
    />
  );
};

export default RestaurantCartActions;
