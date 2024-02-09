import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { StoreProvider } from './context/StoreContext';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import {
  HomePage,
  LocationsPage,
  OrderPage,
  CheckoutPage,
  NotFoundPage,
} from './pages';
import Header from './components/Header';
import ShoppingCart from './components/ShoppingCart';

function App() {
  return (
    <ShoppingCartProvider>
      <StoreProvider>
        <BrowserRouter>
          <ShoppingCart />
          <Header />
          <Container className="mb-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/locations" element={<LocationsPage />} />
              <Route path="/:location/menu" element={<OrderPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </StoreProvider>
    </ShoppingCartProvider>
  );
}

export default App;
