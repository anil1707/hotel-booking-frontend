import api from "./axios";

import type {
  ApiResponse,
  Pagination,
} from "../types/api";

import type {
  Hotel,
  HotelSearchParams,
} from "../types/hotel";

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