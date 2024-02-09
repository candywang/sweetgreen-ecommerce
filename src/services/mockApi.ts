import { locations, menus } from '../mock';

export const fetchLocations = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(locations);
    }, 1000);
  });
};

export const fetchLocation = async locationId => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const [locationInfo] = locations.filter(
        location => location.id === locationId
      );
      if (locationInfo) {
        resolve(locationInfo);
      } else {
        reject(new Error('Location not found'));
      }
    }, 1000);
  });
};

export const fetchMenu = async locationId => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(menus[locationId]);
    }, 1000);
  });
};
