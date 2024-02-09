import { NavLink, useLocation } from 'react-router-dom';
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { useStore } from '../context/StoreContext';
import GenericButton from './GenericButton';
import { BrandLogoIcon } from './Icons';
import { formatLocationName } from '../utils/format';
import ShoppingCartButton from './ShoppingCartButton';

function Header() {
  const { pathname } = useLocation();
  const { currentLocation } = useStore();
  const { totalCartQuantity, openCart } = useShoppingCart();
  const to = currentLocation ? `/${currentLocation.id}/menu` : '/locations';

  const maybeOrderButton = totalCartQuantity === 0 && pathname === '/' && (
    <GenericButton to={to}>Order</GenericButton>
  );

  const maybeCartButton = totalCartQuantity > 0 && (
    <ShoppingCartButton onClick={openCart} quantity={totalCartQuantity} />
  );

  const maybeCurrentLocation = currentLocation && (
    <Nav.Link as={NavLink} to={`/${currentLocation.id}/menu`}>
      Menu: {formatLocationName(currentLocation.name, true)}
    </Nav.Link>
  );

  return (
    <Navbar sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Row className="w-100">
          <Col className="d-flex justify-content-start align-items-center">
            <Nav>
              <Nav.Link as={NavLink} to="/locations">
                Locations
              </Nav.Link>
              {maybeCurrentLocation}
            </Nav>
          </Col>
          <Col className="d-flex justify-content-center align-items-center">
            <Nav>
              <Nav.Link as={NavLink} to="/">
                <BrandLogoIcon />
              </Nav.Link>
            </Nav>
          </Col>
          <Col className="d-flex justify-content-end align-items-center">
            <Nav>
              {maybeOrderButton}
              {maybeCartButton}
            </Nav>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default Header;
