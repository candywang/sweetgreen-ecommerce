import { Card } from 'react-bootstrap';
import { formatLocationName } from '../utils/format';
import { Location } from '../types/types';

type LocationCardProps = {
  location: Location;
  onSelect: (location: Location) => void;
};

function LocationCard({ location, onSelect }: LocationCardProps) {
  return (
    <Card
      className="mb-3 text-center"
      style={{ maxWidth: '600px', width: '90%' }}
      onClick={() => onSelect(location)}
      bg="light"
    >
      <Card.Img
        variant="top"
        src={location.imgUrl || 'https://via.placeholder.com/600x300'}
        alt={location.name}
        height="300"
      />
      <Card.Body>
        <Card.Title>{formatLocationName(location.name)}</Card.Title>
        <Card.Text className="text-muted">
          {location.address.street}
          <br />
          {`${location.address.city}, ${location.address.state} ${location.address.zip}`}
          <br />
          Phone: {location.phone}
          <br />
          Hours:
          {location.hours.map((hour, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={`${hour}-${index}`}>{hour}</div>
          ))}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default LocationCard;
