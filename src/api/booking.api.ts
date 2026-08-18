import api from "./axios";

import type {
  CheckAvailabilityRequest,
  CheckAvailabilityResponse,
} from "../types/booking";

export const checkAvailability =
  async (
    payload: CheckAvailabilityRequest
  ) => {
    const response =
      await api.post<{
        success: boolean;
        data: CheckAvailabilityResponse;
      }>(
        "/bookings/check-availability",
        payload
      );

    return response.data;
  };