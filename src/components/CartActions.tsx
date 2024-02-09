import { Button, CardActions } from '@mui/material';
import { AddToBagIcon, TrashIcon } from './Icons';

type CartActionsProps = {
  id: number;
  quantity: number;
  decrementItemQuantity: (id: number) => void;
  incrementItemQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  isDisabled?: boolean;
};

function CartActions({
  id,
  quantity,
  decrementItemQuantity,
  incrementItemQuantity,
  removeFromCart,
  isDisabled = false,
}: CartActionsProps) {
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
        <Button size="small" onClick={() => removeFromCart(id)}>
          <TrashIcon />
        </Button>
      )}
    </CardActions>
  );
}

export default CartActions;
