import { useNavigate } from 'react-router-dom';
import OrderNowButton from '../components/OrderNowButton';

const HomePage = () => {
  const navigate = useNavigate();
  const gotomenu = () => {
    navigate('/culver-city/menu');
  };

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <OrderNowButton />
      </div>
      <div>
        <div>Welcome.</div>
        <button onClick={gotomenu}>Finish up your pickup order</button>
      </div>
    </div>
  );
};

export default HomePage;
