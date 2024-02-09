import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLocations } from '../services/mockApi';
import LocationCard from '../components/LocationCard';
import { Location } from '../types/types';

function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
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

  const handleLocationSelect = async (locationId: string) => {
    navigate(`/${locationId}/menu`);
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
          onSelect={() => handleLocationSelect(location.id)}
        />
      ))}
    </div>
  );
}

export default LocationsPage;
