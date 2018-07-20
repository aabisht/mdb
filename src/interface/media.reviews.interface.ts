export interface MediaReviews {
  id: number;
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
}

export interface Review {
  author: string;
  content: string;
  id: string;
  url: string;
}
