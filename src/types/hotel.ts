interface Location {
  address: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface Hotel {
  location: Location;
  _id: string;
  ownerId: string;
  name: string;
  description: string;
  images: string[];
  amenities: string[];
  rating: number;
  totalReviews: number;
  status: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface HotelSearchParams {
  search?: string;
  location?: string;
  rating?: number;
  amenities?: string;

  checkIn?: string;
  checkOut?: string;

  guests?: number;
  rooms?: number;

  sort?: "rating_desc" | "newest";

  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number
}