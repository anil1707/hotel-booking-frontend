export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiErrorResponse {
  success: boolean;
  message: string;
}

export interface ApiError {
  response?: {
    status: number;
    data?: ApiErrorResponse;
  };

  message: string;
}