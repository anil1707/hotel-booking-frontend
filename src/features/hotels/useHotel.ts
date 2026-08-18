import {
  useQuery,
  keepPreviousData,
} from "@tanstack/react-query";

import {
  getHotels,
  getHotelById,
} from "../../api/hotel.api";

import type {
  HotelSearchParams,
} from "../../types/hotel";

// Get hotel list
export const useHotels = (
  params: HotelSearchParams
) => {
  return useQuery({
    queryKey: [
      "hotels",
      params,
    ],

    queryFn: () =>
      getHotels(params),

    placeholderData:
      keepPreviousData,
  });
};

// Get single hotel
export const useHotel = (
  hotelId: string
) => {
  return useQuery({
    queryKey: [
      "hotel",
      hotelId,
    ],

    queryFn: () =>
      getHotelById(hotelId),

    enabled: Boolean(hotelId),
  });
};

import {
  getHotelRooms,
} from "../../api/hotel.api";

export const useHotelRooms = (
  hotelId: string
) => {
  return useQuery({
    queryKey: [
      "hotel-rooms",
      hotelId,
    ],

    queryFn: () =>
      getHotelRooms(hotelId),

    enabled: Boolean(hotelId),
  });
};