import { useLocation, matchPath, NavLink } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext';
import OrderNowButton from './OrderNowButton';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { ShoppingBagIcon, BrandLogoIcon } from './Icons';

const Header = () => {
  const { currentLocation } = useShoppingCart();
  const { totalCartQuantity, openCart } = useShoppingCart();
  const { pathname } = useLocation();
  const pattern = '/:location/menu';
  const match = matchPath({ path: pattern, end: false }, pathname);

  const maybeCurrentLocation = currentLocation && (
    <Nav.Link
      as={NavLink}
      to={`/${currentLocation.name}/menu`}
      disabled={match}
    >
      {currentLocation.name}
    </Nav.Link>
  );

  const maybeOrderNowButton = !match && <OrderNowButton />;

  const maybeCartIconButton = totalCartQuantity > 0 && (
    <Button style={{ position: 'relative' }} onClick={openCart}>
      <ShoppingBagIcon />
      <div
        style={{
          color: 'black',
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
        {maybeOrderNowButton}
        {maybeCartIconButton}
      </Container>
    </Navbar>
  );
};

export default Header;
