import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import {
  HomePage,
  LocationsPage,
  OrderPage,
  CheckoutPage,
  NotFoundPage,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/:location/menu" element={<OrderPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
