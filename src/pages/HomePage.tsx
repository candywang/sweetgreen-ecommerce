import { Container, Row, Col } from 'react-bootstrap';
import GenericButton from '../components/GenericButton';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { useStore } from '../context/StoreContext';

function HomePage() {
  const { totalCartQuantity } = useShoppingCart();
  const { currentLocation } = useStore();
  const to = currentLocation ? `/${currentLocation.id}/menu` : '/locations';
  const maybeFinishPickUpOrderButton = totalCartQuantity > 0 && (
    <GenericButton to={to} style={{ width: '100%', height: '30%' }}>
      Finish up your pickup order
    </GenericButton>
  );

  return (
    <Container>
      <Row style={{ height: '50vh' }}>
        <Col>
          <GenericButton to={to} style={{ height: '100%', width: '100%' }}>
            Order
          </GenericButton>
        </Col>
        <Col style={{ display: 'flex', flexDirection: 'column' }}>
          <h1>Welcome.</h1>
          {maybeFinishPickUpOrderButton}
          <GenericButton to={to} style={{ marginTop: '10px' }}>
            Order now
          </GenericButton>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
