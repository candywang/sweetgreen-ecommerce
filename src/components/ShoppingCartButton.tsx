import GenericButton from './GenericButton';
import { ShoppingBagIcon } from './Icons';

type ShoppingCartButtonProps = {
  onClick: () => void;
  quantity: number;
};

function ShoppingCartButton({ onClick, quantity }: ShoppingCartButtonProps) {
  return (
    <GenericButton
      variant="outlined"
      className="position-relative p-0 border-0 bg-transparent"
      onClick={onClick}
    >
      <ShoppingBagIcon isOpen />
      <span
        className="position-absolute badge text-dark"
        style={{
          top: '60%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '12px',
        }}
      >
        {quantity}
      </span>
    </GenericButton>
  );
}

export default ShoppingCartButton;
