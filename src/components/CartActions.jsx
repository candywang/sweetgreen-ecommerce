import { Button, CardActions } from '@mui/material';
import { AddToBagIcon, TrashIcon } from './Icons';

const CartActions = ({
  id,
  quantity,
  decrementItemQuantity,
  incrementItemQuantity,
  removeFromCart,
  isDisabled = false,
}) => {
  return (
    <CardActions className="d-flex align-items-center justify-content-center">
      {quantity > 0 && (
        <>
          <Button onClick={() => decrementItemQuantity(id)}>-</Button>
          <div className="mx-3">{quantity}</div>
        </>
      )}
      <Button
        onClick={() => incrementItemQuantity(id)}
        style={{ width: '40px', height: '40px' }}
        disabled={isDisabled}
      >
        {quantity > 0 ? '+' : <AddToBagIcon />}
      </Button>
      {quantity > 0 && (
        <Button variant="danger" size="sm" onClick={() => removeFromCart(id)}>
          <TrashIcon />
        </Button>
      )}
    </CardActions>
  );
};

export default CartActions;
