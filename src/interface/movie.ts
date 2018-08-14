export interface IMovie {
  page: number;
  total_results: number;
  total_pages: number;
  results: {
    [key: number]: IMovieResult
  };
  dates: {
    maximum: string,
    minimum: string
  };
}

export interface IMovieResult {
  vote_count: number;
  id: number;
  video: boolean;
  vote_average: number;
  title: string;
  popularity: number;
  poster_path: string;
  original_language: string;
  original_title: string;
  genre_ids: number[];
  genre_name: string[];
  backdrop_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
}
