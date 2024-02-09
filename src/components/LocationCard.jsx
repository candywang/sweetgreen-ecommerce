import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const LocationCard = ({ location, onSelect }) => (
  <Card
    sx={{ maxWidth: 600, mb: 2, width: '90%' }}
    onClick={() => onSelect(location)}
  >
    <CardActionArea>
      <CardMedia
        component="img"
        height="250"
        image={location.imgUrl || 'https://via.placeholder.com/600x250'}
        alt={location.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {location.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {location.address.street}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`${location.address.city}, ${location.address.state} ${location.address.zip}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Phone: {location.phone}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Hours:
        </Typography>
        {location.hours.map((hour, index) => (
          <Typography key={index} variant="body2" color="text.secondary">
            {hour}
          </Typography>
        ))}
      </CardContent>
    </CardActionArea>
  </Card>
);

export default LocationCard;
