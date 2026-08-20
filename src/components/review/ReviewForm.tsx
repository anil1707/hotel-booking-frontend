import { FormEvent, useState } from "react";

interface ReviewFormProps {
  onSubmit: (
    rating: number,
    comment: string
  ) => void;

  isSubmitting: boolean;
}

const ReviewForm = ({
  onSubmit,
  isSubmitting,
}: ReviewFormProps) => {
  const [rating, setRating] =
    useState(5);

  const [comment, setComment] =
    useState("");

  const handleSubmit = (
    event: FormEvent
  ) => {
    event.preventDefault();

    if (!comment.trim()) {
      return;
    }

    onSubmit(
      rating,
      comment.trim()
    );
  };

  return (
    <form
      className="review-form"
      onSubmit={handleSubmit}
    >
      <h3>
        Write a Review
      </h3>

      <div className="rating-selector">
        <label>
          Rating
        </label>

        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map(
            (value) => (
              <button
                key={value}
                type="button"
                className={
                  value <= rating
                    ? "star active"
                    : "star"
                }
                onClick={() =>
                  setRating(value)
                }
              >
                ★
              </button>
            )
          )}
        </div>
      </div>

      <div className="review-comment">
        <label htmlFor="comment">
          Your Review
        </label>

        <textarea
          id="comment"
          value={comment}
          onChange={(event) =>
            setComment(
              event.target.value
            )
          }
          placeholder="Share your experience..."
          maxLength={1000}
          rows={5}
          required
        />

        <span>
          {comment.length}/1000
        </span>
      </div>

      <button
        type="submit"
        className="submit-review-button"
        disabled={
          isSubmitting ||
          !comment.trim()
        }
      >
        {isSubmitting
          ? "Submitting..."
          : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;