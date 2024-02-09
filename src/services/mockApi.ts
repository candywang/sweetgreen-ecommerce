import { locations, menus } from '../mock';
import { Location, LocationMenu } from '../types/types';

export const fetchLocations = async () => {
  return new Promise<Location[]>(resolve => {
    setTimeout(() => {
      resolve(locations);
    }, 1000);
  });
};

export const fetchLocation = async (locationId: string) => {
  return new Promise<Location>((resolve, reject) => {
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

export const fetchMenu = async (locationId: string) => {
  return new Promise<LocationMenu>(resolve => {
    setTimeout(() => {
      resolve(menus[locationId]);
    }, 1000);
  });
};
