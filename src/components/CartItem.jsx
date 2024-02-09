import { Stack } from 'react-bootstrap';
import menus from '../mock/menus';
import { formatPrice } from '../utils/format';
import RestaurantCartActions from './RestaurantCartActions';

const CartItem = ({ id, quantity }) => {
  const menu = menus['culver-city'];
  const storeMenu = menu.flatMap(category => category.items);
  const foundItem = storeMenu.find(item => item.id === id);
  if (!foundItem) return null;
  const { name, imgUrl, price } = foundItem;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={imgUrl || 'https://via.placeholder.com/200x75'}
        style={{ width: '125px', height: '75px', objectFit: 'cover' }}
      />
      <div className="me-auto">
        <div>
          {name}{' '}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: '.65rem' }}>
              x {quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: '.75rem' }}>
          {formatPrice(price)}
        </div>
        <RestaurantCartActions id={id} quantity={quantity} />
      </div>
    </Stack>
  );
};

export default CartItem;
