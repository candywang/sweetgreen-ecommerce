import { NavLink, useLocation } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext';
import GenericButton from './GenericButton';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { ShoppingBagIcon, BrandLogoIcon } from './Icons';
import { formatLocationName } from '../utils/format';

const Header = () => {
  const { pathname } = useLocation();
  const { currentLocation } = useShoppingCart();
  const { totalCartQuantity, openCart, isOpen } = useShoppingCart();
  const to = currentLocation ? `/${currentLocation.id}/menu` : '/locations';

  const maybeOrderButton = totalCartQuantity === 0 && pathname === '/' && (
    <GenericButton to={to}>Order</GenericButton>
  );

  const maybeCartButton = totalCartQuantity > 0 && (
    <Button style={{ position: 'relative' }} onClick={openCart}>
      <ShoppingBagIcon isOpen />
      <div
        style={{
          color: isOpen ? 'white' : 'black',
          width: '16px',
          height: '16px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '12px',
        }}
      >
        {totalCartQuantity}
      </div>
    </Button>
  );

  const maybeCurrentLocation = currentLocation && (
    <Nav.Link as={NavLink} to={`/${currentLocation.id}/menu`}>
      Menu: {formatLocationName(currentLocation.name, true)}
    </Nav.Link>
  );

  return (
    <Navbar sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/locations">
            Locations
          </Nav.Link>
        </Nav>
        {maybeCurrentLocation}
        <Nav.Link as={NavLink} to="/">
          <BrandLogoIcon />
        </Nav.Link>
        {maybeOrderButton}
        {maybeCartButton}
      </Container>
    </Navbar>
  );
};

export default Header;
