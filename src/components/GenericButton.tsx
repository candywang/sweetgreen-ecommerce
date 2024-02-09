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
  variant = 'contained',
  color = 'primary',
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
    <Button variant={variant} color={color} onClick={handleClick}>
      {children}
    </Button>
  );
}

export default GenericButton;
