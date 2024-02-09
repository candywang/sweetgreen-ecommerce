import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLocations } from '../services/mockApi';
import LocationCard from '../components/LocationCard';

const LocationsPage = () => {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!locations.length) {
      const getLocations = async () => {
        try {
          setIsLoading(true);
          const data = await fetchLocations();
          setLocations(data);
        } catch (err) {
          setError('Failed to fetch locations');
        } finally {
          setIsLoading(false);
        }
      };

      getLocations();
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleLocationSelect = async location => {
    navigate(`/${location.id}/menu`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div>Select a Pickup location:</div>
      {locations.map(location => (
        <LocationCard
          key={location.id}
          location={location}
          onSelect={handleLocationSelect}
        />
      ))}
    </div>
  );
};

export default LocationsPage;
