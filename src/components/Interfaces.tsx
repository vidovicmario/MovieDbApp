export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  director: string;
  date: string;
  original_title: string;
  release_date: string;
  overview: string;
}

export interface Video {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  director: string;
  date: string;
  original_title: string;
  release_date: string;
  overview: string;
  movieData: any;
}

export interface Actor {
  id: number;
  name: string;
  title: string;
  profile_path: string;
  cast: any[];
  // Update the type of 'cast' property accordingly
}
