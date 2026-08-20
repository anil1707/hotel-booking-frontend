interface FavoriteHotel {
  _id: string;
  name: string;

  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
  };

  rating: number;
  reviewCount: number;
  images: string[];
}

export interface Favorite {
  _id: string;
  userId: string;
  hotelId: FavoriteHotel;
  createdAt: string;
  updatedAt: string;
}

export interface FavoritesResponse {
  success: boolean;
  data: Favorite[];
}

export interface FavoriteResponse {
  success: boolean;
  message: string;
  data: Favorite;
}