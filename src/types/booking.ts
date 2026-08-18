export interface BookingSelection {
  hotelId: string;
  roomId: string;

  checkIn: string;
  checkOut: string;

  guests: number;
  rooms: number;
}

export interface BookingState {
  hotelId: string;
  hotelName: string;

  roomId: string;
  roomName: string;

  pricePerNight: number;

  checkIn: string;
  checkOut: string;

  guests: number;
  rooms: number;
}

export interface CheckAvailabilityRequest {
  hotelId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
}

export interface CheckAvailabilityResponse {
  available: boolean;
  pricePerNight: number;
  nights: number;
  totalAmount: number;
}