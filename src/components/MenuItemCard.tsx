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
      <Card.Body className="d-flex flex-column">
        {tags.length
          ? tags.map(tag => (
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                key={tag}
                style={{ position: 'absolute', top: '0' }}
              >
                {tag}
              </Typography>
            ))
          : null}
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
        {allergens.length ? (
          <Typography variant="body2" color="error" component="p">
            Allergens: {allergens.join(', ')}
          </Typography>
        ) : null}
        <Typography variant="body2" color="textPrimary" component="p">
          {`$${price} | ${calories} Calories`}
        </Typography>
      </Card.Body>
      <RestaurantCartActions id={id} quantity={quantityInCart} />
    </Card>
  );
}

export default MenuItemCard;
