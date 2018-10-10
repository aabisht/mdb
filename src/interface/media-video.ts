export interface IMediaVideo {
  id: number;
  results: IMediaVideoResult[];
}

export interface IMediaVideoResult {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
}
