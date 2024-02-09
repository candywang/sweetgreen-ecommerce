import { Typography } from '@mui/material';
import MenuItemCard from './MenuItemCard';
import CategoryNavBar from './CategoryNavBar';
import { Row, Col } from 'react-bootstrap';

const MenuSection = ({ storeMenu }) => {
  const { category, items } = storeMenu;
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
};

const MenuRender = ({ menuData }) => (
  <>
    <CategoryNavBar categories={menuData.map(data => data.category)} />
    {menuData.map(storeMenu => (
      <MenuSection key={storeMenu.category} storeMenu={storeMenu} />
    ))}
  </>
);

export default MenuRender;
