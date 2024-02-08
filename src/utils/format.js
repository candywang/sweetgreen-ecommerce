export const formatLocationName = name => {
  return name
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};

export const formatPrice = price => `$${price.toFixed(2)}`;
