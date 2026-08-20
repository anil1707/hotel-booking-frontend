import type { Review } from "../../api/review.api";


interface ReviewListProps {
  reviews: Review[];
}

const ReviewList = ({
  reviews,
}: ReviewListProps) => {
  if (!reviews.length) {
    return (
      <div className="reviews-placeholder">
        <p>
          No reviews yet.
          Be the first to review
          this hotel.
        </p>
      </div>
    );
  }

  return (
    <div className="reviews-list">
      {reviews.map((review) => (
        <article
          key={review._id}
          className="review-card"
        >
          <div className="review-card-header">
            <div>
              <h3>
                {review.userId?.name ||
                  "Anonymous"}
              </h3>

              <span>
                {new Date(
                  review.createdAt
                ).toLocaleDateString()}
              </span>
            </div>

            <div className="review-rating">
              {"★".repeat(
                review.rating
              )}
              {"☆".repeat(
                5 - review.rating
              )}
            </div>
          </div>

          <p className="review-comment">
            {review.comment}
          </p>
        </article>
      ))}
    </div>
  );
};

export default ReviewList;