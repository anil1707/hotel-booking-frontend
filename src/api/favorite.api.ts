import type { FavoriteResponse, FavoritesResponse } from "../types/favorite";
import api from "./axios";

export const getFavorites = async () => {
  const response =
    await api.get<FavoritesResponse>(
      "/favorites"
    );

  return response.data;
};

export const addFavorite = async (
  hotelId: string
) => {
  const response =
    await api.post<FavoriteResponse>(
      `/favorites/${hotelId}`
    );

  return response.data;
};

export const removeFavorite = async (
  hotelId: string
) => {
  await api.delete(
    `/favorites/${hotelId}`
  );
};