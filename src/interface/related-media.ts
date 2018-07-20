export interface IRelatedMedia {
  page: number;
  results: IRelatedMediaResult[];
  total_pages: number;
  total_results: number;
}

export interface IRelatedMediaResult {
  adult: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  popularity: number;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
