export interface IMediaCredits {
  id: number;
  cast: ICast[];
  crew: ICrew[];
}

export interface ICrew {
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  name: string;
  profile_path?: string;
}

export interface ICast {
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  name: string;
  order: number;
  profile_path?: string;
}
