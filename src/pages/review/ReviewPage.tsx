import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import ReviewForm from "../../components/review/ReviewForm";
import { useCreateReview } from "../../features/review/useReview";
import { toast } from "../../services/toast.service";


interface ReviewState {
  bookingId: string;
  hotelId: string;
}

const CreateReviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state =
    location.state as
      | ReviewState
      | undefined;

  const hotelId =
    state?.hotelId ?? "";

  const bookingId =
    state?.bookingId ?? "";

  const {
    mutateAsync: submitReview,
    isPending,
  } = useCreateReview(hotelId);

  if (!state) {
    return (
      <main className="page-container">
        <div className="page-state">
          <h2>
            Review information not found
          </h2>

          <button
            type="button"
            onClick={() =>
              navigate("/bookings")
            }
          >
            Back to bookings
          </button>
        </div>
      </main>
    );
  }

  const handleSubmit = async (
    rating: number,
    comment: string
  ) => {
    try {
      await submitReview({
        bookingId,
        rating,
        comment,
      });

      navigate("/bookings");
    } catch (error) {
        // toast.error("Fialed to create reivew")
      console.error(
        "Failed to create review:",
        error
      );
    }
  };

  return (
    <main className="page-container">
      <div className="review-page">

        <button
          type="button"
          className="back-link-button"
          onClick={() =>
            navigate(-1)
          }
        >
          ← Back
        </button>

        <h1>
          Write a Review
        </h1>

        <p>
          Share your experience with
          this hotel.
        </p>

        <ReviewForm
          onSubmit={handleSubmit}
          isSubmitting={isPending}
        />

      </div>
    </main>
  );
};

export default CreateReviewPage;