export interface ITv {
  page: number;
  total_results: number;
  total_pages: number;
  results: {
    [key: number]: ITVResult
  };
}

export interface ITVResult {
  original_name: string;
  genre_ids: number[];
  genre_name: string[];
  name: string;
  popularity: number;
  origin_country: string[];
  vote_count: number;
  first_air_date: number;
  backdrop_path: string;
  original_language: string;
  id: number;
  vote_average: number;
  overview: string;
  poster_path: string;
}
