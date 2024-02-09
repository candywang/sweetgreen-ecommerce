import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonProps } from '@mui/material';

interface GenericButtonProps extends Omit<ButtonProps, 'onClick'> {
  children?: ReactNode;
  to?: string;
  onClick?: () => void;
}

function GenericButton({
  children,
  to,
  onClick,
  ...buttonProps
}: GenericButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleClick}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...buttonProps}
    >
      {children}
    </Button>
  );
}

export default GenericButton;
