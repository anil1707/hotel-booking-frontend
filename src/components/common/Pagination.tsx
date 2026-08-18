interface PaginationProps {
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;

  onPageChange: (
    page: number
  ) => void;
}

const Pagination = ({
  page,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="pagination">
      <button
        type="button"
        disabled={!hasPreviousPage}
        onClick={() =>
          onPageChange(page - 1)
        }
      >
        ← Previous
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

      <button
        type="button"
        disabled={!hasNextPage}
        onClick={() =>
          onPageChange(page + 1)
        }
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;