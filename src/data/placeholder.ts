export interface MediaItem {
  id: string;
  title: string;
  poster: string;
  backdrop: string;
  year: number;
  duration: string; // e.g., "1h 45m" or "45m"
  rating: number; // 0-10
  category: string;
  isTrending?: boolean;
  progress?: number; // 0-100 for continue watching
}

const POSTER_BASE_URL = "https://placehold.co/400x600/1e1e1e/FFF?text=";
const BACKDROP_BASE_URL = "https://placehold.co/1280x720/1e1e1e/FFF?text=";

export const CATEGORIES = [
  "Action", "Comedy", "Drama", "Sci-Fi", "Horror", "Documentary", "Anime"
];

const generateMedia = (count: number): MediaItem[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `media-${i}`,
    title: `Movie Title ${i + 1}`,
    poster: `${POSTER_BASE_URL}Poster+${i + 1}`,
    backdrop: `${BACKDROP_BASE_URL}Backdrop+${i + 1}`,
    year: 2020 + (i % 5),
    duration: `${80 + (i % 60)}m`,
    rating: Number((5 + Math.random() * 5).toFixed(1)),
    category: CATEGORIES[i % CATEGORIES.length],
    isTrending: i < 5,
    progress: i % 3 === 0 ? Math.floor(Math.random() * 90) : undefined,
  }));
};

export const MOCK_MEDIA = generateMedia(20);

export const TRENDING_MEDIA = MOCK_MEDIA.filter(m => m.isTrending);

export const CONTINUE_WATCHING = MOCK_MEDIA.filter(m => m.progress !== undefined);

export const RECENT_SEARCHES = ["Avatar", "Inception", "The Dark Knight", "Interstellar"];

export const USER_PROFILE = {
  name: "Demo User",
  email: "user@example.com",
  avatar: "https://placehold.co/100x100/e50914/FFF?text=U",
};
