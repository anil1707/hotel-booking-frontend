import api from "../api/axios";

export interface ReviewUser {
  _id: string;
  name: string;
}

export interface Review {
  _id: string;
  userId: ReviewUser;
  hotelId: string;
  bookingId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetReviewsResponse {
  success: boolean;
  data: Review[];
}

export interface CreateReviewPayload {
  bookingId: string;
  rating: number;
  comment: string;
}

export interface CreateReviewResponse {
  success: boolean;
  message: string;
  data: Review;
}

export const getHotelReviews = async (
  hotelId: string
) => {
  const response =
    await api.get<GetReviewsResponse>(
      `/hotels/${hotelId}/reviews`
    );

  return response.data;
};

export const createReview = async (
  hotelId: string,
  payload: CreateReviewPayload
) => {
  const response =
    await api.post<CreateReviewResponse>(
      `/hotels/${hotelId}/reviews`,
      payload
    );

  return response.data;
};