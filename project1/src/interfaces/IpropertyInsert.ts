import type { Towns } from "./Itown.ts";
export interface PropertyInsert {
  address: string;
  title: string;
  descripcion: string;
  townId: number;
  sqmeters: number;
  numRooms: number;
  numBathrooms: number;
  price: number;
  mainPhoto: string;
}

export interface Property extends Omit<PropertyInsert, "townId"> {
  id: number;
  totalRating: number;
  createdAt: Date;
  status: string;
  town: Towns;
  seller: number;
}
