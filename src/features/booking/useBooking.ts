import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
    cancelBooking,
  checkAvailability,
  createBooking,
  getBookingById,
  getMyBookings,
} from "../../api/booking.api";

export const useCheckAvailability = () => {
  return useMutation({
    mutationFn: checkAvailability,
  });
};

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: createBooking,
  });
};

export const useMyBookings = () => {
  return useQuery({
    queryKey: ["my-bookings"],
    queryFn: getMyBookings,
  });
};

export const useBookingById = (
  bookingId: string
) => {
  return useQuery({
    queryKey: [
      "booking",
      bookingId,
    ],
    queryFn: () =>
      getBookingById(bookingId),
    enabled: Boolean(bookingId),
  });
};

export const useCancelBooking = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: cancelBooking,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-bookings"],
      });
    },
  });
};