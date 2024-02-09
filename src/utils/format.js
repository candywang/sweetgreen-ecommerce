export const formatLocationName = name =>
  name
    ? name
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')
    : '';

export const formatPrice = price =>
  `$${(Math.round((price + Number.EPSILON) * 100) / 100).toFixed(2)}`;
