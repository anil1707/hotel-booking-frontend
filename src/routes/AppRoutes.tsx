import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import HomePage from "../pages/Home/HomePage";
import MainLayout from "../loyouts/MainLayout";
import HotelsPage from "../pages/Hotels/HotelsPage";
import HotelDetailsPage from "../pages/Hotels/HotelDetailsPage";
import BookingSummaryPage from "../pages/booking/BookingSummaryPage";
import BookingDetailsPage from "../pages/booking/BookingDetailPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import BookingConfirmationPage from "../pages/booking/BookingConfirmationpage";
import MyBookingsPage from "../pages/myBookings/MyBookingPage";
import BookingDetailPage from "../pages/myBookings/BoookingDetailPage";
import FavoritesPage from "../pages/favorite/FavoritePage";
import CreateReviewPage from "../pages/review/ReviewPage";
import OwnerLoginPage from "../pages/owner/auth/OwnerLoginpage";
import OwnerRegisterPage from "../pages/owner/auth/OwnerRegisterPage";
import OwnerLayout from "../loyouts/OwnerLayout";
import OwnerDashboardPage from "../pages/owner/dashboard/OwnerDashboardPage";
import ProtectedRoute from "./ProtectedRoutes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={<MainLayout />}
        >
          <Route
            path="/"
            element={<HomePage />}
          />

          <Route
            path="/hotels"
            element={<HotelsPage />}
          />

          <Route
            path="/hotels/:hotelId"
            element={
              <HotelDetailsPage />
            }
          />

          <Route
            path="/booking"
            element={
              <BookingDetailsPage />
            }
          />

          <Route
            path="/booking/summary"
            element={
              <BookingSummaryPage />
            }
          />
          <Route
            path="/booking/confirmation/:id"
            element={<BookingConfirmationPage />}
          />

          <Route
            path="/bookings"
            element={<MyBookingsPage />}
          />

          <Route
            path="/bookings/:id"
            element={<BookingDetailPage />}
          />
          <Route
            path="/favorites"
            element={
              <FavoritesPage />
            }
          />

          <Route
            path="/hotels/:hotelId/review"
            element={<CreateReviewPage />}
          />
        </Route>

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={
            <RegisterPage />
          }
        />

        {/* Owner */}
        <Route
          path="/owner/login"
          element={<OwnerLoginPage />}
        />

        <Route
          path="/owner/register"
          element={<OwnerRegisterPage />}
        />

        <Route
          element={
            <ProtectedRoute
              allowedRoles={["hotel_owner"]}
            />
          }
        >
          <Route
            path="/owner"
            element={<OwnerLayout />}
          >
            <Route
              index
              element={<OwnerDashboardPage />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;