import { Typography } from '@mui/material';
import { Row, Col } from 'react-bootstrap';
import MenuItemCard from './MenuItemCard';
import { LocationMenu, MenuSection } from '../types/types';

type RestaurantMenuSectionProps = {
  menuSection: MenuSection;
};

function RestaurantMenuSection({ menuSection }: RestaurantMenuSectionProps) {
  const { category, items } = menuSection;
  return (
    <div id={category} style={{ margin: '2rem 0' }}>
      <Typography variant="h4" gutterBottom>
        {category}
      </Typography>
      <Row xs={1} sm={2} md={3} lg={4} className="g-3">
        {items.map(item => (
          <Col key={item.id}>
            <MenuItemCard item={item} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

type RestaurantContainerProps = {
  restaurantMenu: LocationMenu;
};

function RestaurantContainer({ restaurantMenu }: RestaurantContainerProps) {
  return (
    <>
      {restaurantMenu.map((menuSection: MenuSection) => (
        <RestaurantMenuSection
          key={menuSection.category}
          menuSection={menuSection}
        />
      ))}
    </>
  );
}

export default RestaurantContainer;
