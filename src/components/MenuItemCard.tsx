import { Typography } from '@mui/material';
import { Card } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import RestaurantCartActions from './RestaurantCartActions';
import { MenuItem } from '../types/types';

type MenuItemCardProps = {
  item: MenuItem;
};

// make this dynamic, because can just be menu item
function MenuItemCard({ item }: MenuItemCardProps) {
  const { getItemQuantity } = useShoppingCart();
  const { id, name, imgUrl, tags, description, allergens, price, calories } =
    item;
  const quantityInCart = getItemQuantity(id);

  return (
    <Card style={{ maxWidth: '345px' }} className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl || 'https://via.placeholder.com/345x200'}
        alt={name}
        height="200px"
        style={{ objectFit: 'cover' }}
      />
      {tags.length
        ? tags.map(tag => (
            <Card.Text key={tag} style={{ position: 'absolute', top: '0' }}>
              {tag}
            </Card.Text>
          ))
        : null}
      <Card.Title>{name}</Card.Title>
      <Card.Body className="d-flex flex-column">
        <Card.Text>{description}</Card.Text>
        {allergens.length ? (
          <Card.Text>Allergens: {allergens.join(', ')}</Card.Text>
        ) : null}
        <Card.Text>{`$${price} | ${calories} Calories`}</Card.Text>
        <RestaurantCartActions id={id} quantity={quantityInCart} />
      </Card.Body>
    </Card>
  );
}

export default MenuItemCard;
