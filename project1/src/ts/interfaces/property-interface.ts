export interface Province {
  id: number;
  name: string;
}

export interface Towns {
  id: number;
  name: string;
  longitude: number;
  latitude: number;
  province: number | Province;
}

export interface PropertyInsert {
  address: string;
  title: string;
  description: string;
  townId: number;
  sqmeters: number;
  numRooms: number;
  numBaths: number;
  price: number;
  mainPhoto: string;
}

export interface Property extends Omit<PropertyInsert, "townId"> {
  id: number;
  totalRating: number;
  createdAt: string;
  status: string;
  town: Towns;
  seller:{
    id: number;
    name: string;
    email: string;
    avatar: string;
  };
  mine: boolean;
}

export interface PropertiesResponse {
  properties: Property[];
  more: boolean;
  page: number;
}

export interface SinglePropertyRespone {
  property: Property;
}

export interface ProvincesResponse {
  provinces: Province[];
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}
