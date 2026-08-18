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
            path="/favorites"
            element={
              <div>Favorites</div>
            }
          />
        </Route>

        <Route
          path="/login"
          element={<div>Login</div>}
        />

        <Route
          path="/register"
          element={
            <div>Register</div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;