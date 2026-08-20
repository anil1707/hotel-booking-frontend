import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createReview, getHotelReviews, type CreateReviewPayload } from "../../api/review.api";



export const useHotelReviews = (
  hotelId: string
) => {
  return useQuery({
    queryKey: ["hotel-reviews", hotelId],
    queryFn: () =>
      getHotelReviews(hotelId),
    enabled: Boolean(hotelId),
  });
};

export const useCreateReview = (
  hotelId: string
) => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      payload: CreateReviewPayload
    ) =>
      createReview(
        hotelId,
        payload
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "hotel-reviews",
          hotelId,
        ],
      });
    },
  });
};