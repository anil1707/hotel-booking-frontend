import api from "./axios";

import type {
  ApiResponse,
  Pagination,
} from "../types/api";

import type {
  Hotel,
  HotelSearchParams,
} from "../types/hotel";

interface HotelDetailsResponse {
  hotel: Hotel;
}


interface HotelSearchResponse {
  hotels: Hotel[];
  pagination: Pagination;
}

export const getHotels = async (
  params: HotelSearchParams
): Promise<
  ApiResponse<HotelSearchResponse>
> => {
  const response =
    await api.get<
      ApiResponse<HotelSearchResponse>
    >("/hotels", {
      params,
    });

  return response.data;
};

export const getHotelById = async (
  hotelId: string
) => {
  const response =
    await api.get<{
      success: boolean;
      data: HotelDetailsResponse;
    }>(
      `/hotels/${hotelId}`
    );

  return response.data;
};

export interface Room {
  _id: string;
  hotelId: string;
  name: string;
  type: string;
  description?: string;
  pricePerNight: number;
  capacity: number;
  beds: number;
  amenities: string[];
  images: string[];
  totalRooms: number;
  status: string;
}

export const getHotelRooms = async (
  hotelId: string
) => {
  const response = await api.get<{
    success: boolean;
    data: {
      rooms: Room[];
    };
  }>(`/hotels/${hotelId}/rooms`);

  return response.data;
};