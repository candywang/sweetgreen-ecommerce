import { Offcanvas, Stack } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import CartItem from './CartItem';
import menus from '../mock/menus';
import { formatPrice } from '../utils/format';

const ShoppingCart = ({ isOpen }) => {
  const { closeCart, cartItems } = useShoppingCart();
  const menu = menus['culver-city'];
  const storeItems = menu.flatMap(category => category.items);
  const subtotal = cartItems.reduce((total, cartItem) => {
    const item = storeItems.find(i => i.id === cartItem.id);
    return total + (item?.price || 0) * cartItem.quantity;
  }, 0);
  const formattedSubtotal = formatPrice(subtotal);

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Review your pickup order</Offcanvas.Title>
        <Offcanvas.Title>Your Order</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map(item => (
            <CartItem key={item.id} {...item} />
          ))}
        </Stack>
        <div className="ms-auto fw-bold fs-5">
          Subtotal: {formattedSubtotal}
        </div>
        <div>*Reward discounts and final tax will be applied at checkout</div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;
