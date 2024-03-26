import { CardActions } from '@mui/material';
import { AddToBagIcon, TrashIcon } from './Icons';
import GenericButton from './GenericButton';

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
          <GenericButton
            variant="text"
            onClick={() => decrementItemQuantity(id)}
            disabled={quantity === 1}
          >
            -
          </GenericButton>
          <div className="mx-3">{quantity}</div>
        </>
      )}
      <GenericButton
        variant="text"
        onClick={() => incrementItemQuantity(id)}
        // style={{ width: '40px', height: '40px' }}
        disabled={isDisabled}
      >
        {quantity > 0 ? '+' : <AddToBagIcon />}
      </GenericButton>
      {quantity > 0 && (
        <GenericButton
          variant="text"
          size="small"
          onClick={() => removeFromCart(id)}
        >
          <TrashIcon />
        </GenericButton>
      )}
    </CardActions>
  );
}

export default CartActions;
