import * as yup from "yup";

export const bookingSchema = yup.object({
  hotelId: yup
    .string()
    .required("Hotel is required"),

  roomId: yup
    .string()
    .required("Room is required"),

  checkIn: yup
    .string()
    .required("Check-in date is required")
    .test(
      "not-in-past",
      "Check-in date cannot be in the past",
      (value) => {
        if (!value) return true;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const checkInDate = new Date(value);
        checkInDate.setHours(0, 0, 0, 0);

        return checkInDate >= today;
      }
    ),

  checkOut: yup
    .string()
    .required("Check-out date is required")
    .test(
      "after-checkin",
      "Check-out must be after check-in",
      function (value) {
        const { checkIn } = this.parent;

        if (!checkIn || !value) {
          return true;
        }

        return (
          new Date(value) >
          new Date(checkIn)
        );
      }
    ),

  guests: yup
    .number()
    .typeError("Guests must be a number")
    .integer("Guests must be a whole number")
    .min(1, "At least 1 guest is required")
    .required("Guests are required"),

  rooms: yup
    .number()
    .typeError("Rooms must be a number")
    .integer("Rooms must be a whole number")
    .min(1, "At least 1 room is required")
    .required("Rooms are required"),
});