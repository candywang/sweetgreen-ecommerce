import { AppBar, Toolbar, Button } from '@mui/material';

const CategoryNavBar = ({ categories }) => {
  const scrollToCategory = category => {
    const element = document.getElementById(category);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        {categories.map(category => (
          <Button
            key={category}
            color="inherit"
            onClick={() => scrollToCategory(category)}
          >
            {category}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default CategoryNavBar;
