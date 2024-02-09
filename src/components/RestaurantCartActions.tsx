import { useStore } from '../context/StoreContext';
import { useShoppingCart, CartItem } from '../context/ShoppingCartContext';
import CartActions from './CartActions';

type RestaurantCartActionsProps = CartItem;

function RestaurantCartActions({ id, quantity }: RestaurantCartActionsProps) {
  const {
    decrementItemQuantity,
    incrementItemQuantity,
    removeFromCart,
    totalCartQuantity,
  } = useShoppingCart();
  const { currentLocation } = useStore();

  const isLimitReached = currentLocation
    ? totalCartQuantity >= currentLocation.itemLimit
    : false;

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
}

export default RestaurantCartActions;
