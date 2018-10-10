export interface ISearchResults {
  page: number;
  total_results: number;
  total_pages: number;
  results: ISearchMedia[];
}

export interface ISearchMedia {
  original_name?: string;
  id: number;
  media_type: string;
  name?: string;
  vote_count?: number;
  vote_average?: number;
  poster_path?: string;
  first_air_date?: string;
  popularity: number;
  genre_ids?: number[];
  original_language?: string;
  backdrop_path?: string;
  overview?: string;
  origin_country?: string[];
  video?: boolean;
  title?: string;
  original_title?: string;
  adult?: boolean;
  release_date?: string;
  profile_path?: any;
  known_for?: IKnownfor[];
}

export interface IKnownfor {
  vote_average: number;
  vote_count: number;
  id: number;
  video: boolean;
  media_type: string;
  title: string;
  popularity: number;
  poster_path: string;
  original_language: string;
  original_title: string;
  genre_ids: number[];
  backdrop_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
}
