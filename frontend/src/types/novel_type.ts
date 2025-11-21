export type NovelStatus = "Ongoing" | "Completed" | "Hiatus";

export type NovelGenre =
  | "Fantasy"
  | "Romance"
  | "Mystery"
  | "Adventure"
  | "Sci-Fi"
  | "Drama"
  | "Thriller"
  | "Action"
  | "Comedy"
  | "Horror"
  | "Mecha"
  | "Slice of Life"
  | "Eastern"
  | "Games";

export interface Novel {
  id: number;
  title: string;
  author: string;
  genre: NovelGenre;
  status: NovelStatus;
  cover: string;
  rating: number;
  views: number;
  chapters: number;
  tags: string[];
  description?: string;
  releaseDate?: string;
  progress?: number;
  longDescription?: string;
  votes?: number;
}

export interface WeeklyData {
  id: number;
  title: string;
  genre: NovelGenre;
  cover: string;
}
