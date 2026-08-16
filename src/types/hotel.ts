export interface Hotel {
  _id: string;
  name: string;
  description: string;
  location: {
    city: string;
    state?: string;
    country?: string;
    address?: string;
  };
  amenities: string[];
  images: string[];
  rating: number;
  reviewCount: number;
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
}