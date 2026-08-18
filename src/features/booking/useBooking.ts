import {
  useMutation,
} from "@tanstack/react-query";

import {
  checkAvailability,
} from "../../api/booking.api";

export const useCheckAvailability =
  () => {
    return useMutation({
      mutationFn:
        checkAvailability,
    });
  };