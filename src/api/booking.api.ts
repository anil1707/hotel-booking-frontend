import axios from "axios";
import api from "./axios";

export interface CheckAvailabilityPayload {
  hotelId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
}

export interface CheckAvailabilityResponse {
  success: boolean;
  message: string;
  data: {
    available: boolean;
    hotelId: string;
    roomId: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    rooms: number;
    availableRooms: number;
    pricePerNight: number;
    totalNights: number;
    subtotal: number;
    taxes: number;
    totalAmount: number;
  };
}

export const checkAvailability = async (
  payload: CheckAvailabilityPayload
) => {
  const response =
    await api.post<CheckAvailabilityResponse>(
      "/bookings/check-availability",
      payload
    );

  return response.data;
};

export interface CreateBookingPayload {
  hotelId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
}

export interface Booking {
  _id: string;
  bookingNumber: string;

  userId: string;
  hotelId: string;
  roomId: string;

  checkIn: string;
  checkOut: string;

  guests: number;
  rooms: number;

  pricePerNight: number;
  totalNights: number;

  subtotal: number;
  taxes: number;
  totalAmount: number;

  status: string;
  paymentStatus: string;

  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingResponse {
  success: boolean;
  message: string;
  data: Booking;
}

export const createBooking = async (
  payload: CreateBookingPayload
) => {
  const response =
    await api.post<CreateBookingResponse>(
      "/bookings",
      payload
    );

  return response.data;
};

export interface MyBookingsResponse {
  success: boolean;
  data: Booking[];
}

export const getMyBookings = async () => {
  const response =
    await api.get<MyBookingsResponse>(
      "/bookings"
    );

  return response.data;
};

export interface GetBookingResponse {
  success: boolean;
  data: Booking;
}

export const getBookingById = async (
  bookingId: string
) => {
  const response =
    await api.get<GetBookingResponse>(
      `/bookings/${bookingId}`
    );

  return response.data;
};

export const cancelBooking = async (
  bookingId: string
) => {
  const response = await api.patch(
    `/bookings/${bookingId}/cancel`
  );

  return response.data;
};