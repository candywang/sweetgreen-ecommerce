import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const GenericButton = ({
  children,
  to,
  onClick,
  variant = 'contained',
  color = 'primary',
  ...props
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <Button variant={variant} color={color} onClick={handleClick} {...props}>
      {children}
    </Button>
  );
};

export default GenericButton;
