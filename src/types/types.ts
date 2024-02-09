export interface MenuItem {
  id: number;
  tags: string[];
  imgUrl: string;
  name: string;
  description: string;
  allergens: string[];
  price: number;
  calories: number;
  customizable: boolean;
}

export interface MenuSection {
  category: string;
  items: MenuItem[];
}

export type LocationMenu = MenuSection[];

export interface Menus {
  [location: string]: MenuSection[];
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface Location {
  id: string;
  name: string;
  imgUrl: string;
  address: Address;
  phone: string;
  hours: string[];
  itemLimit: number;
}
