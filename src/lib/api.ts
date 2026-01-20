export const API_BASE_URL = "https://www.sankavollerei.com/anime/donghua";

// ============ CACHE LAYER ============
// In-memory cache with TTL to reduce API calls (rate limit: 70/min)
interface CacheEntry<T> {
  data: T;
  expiry: number;
}

const cache = new Map<string, CacheEntry<any>>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiry) {
    cache.delete(key);
    return null;
  }
  console.log(`[StreamX] Cache HIT: ${key}`);
  return entry.data;
}

function setCache<T>(key: string, data: T): void {
  cache.set(key, {
    data,
    expiry: Date.now() + CACHE_TTL
  });
  console.log(`[StreamX] Cache SET: ${key} (expires in 5min)`);
}
// =====================================

export interface DonghuaItem {
  title: string;
  slug: string;
  poster: string;
  status?: string;
  type?: string;
  current_episode?: string;
  episode?: string;
  href?: string;
}

export interface HomeData {
  latest_release: DonghuaItem[];
}

export interface DetailData {
  title: string;
  alter_title?: string;
  poster: string;
  synopsis: string;
  status: string;
  studio?: string;
  network?: string;
  rating?: string;
  duration?: string;
  episodes_count?: string;
  genres: { name: string; slug: string }[];
  episodes_list: {
    episode: string;
    slug: string;
    href: string;
  }[];
}

export interface EpisodeData {
  episode: string;
  streaming: {
    main_url: { url: string };
    servers: { name: string; url: string }[];
  };
  download_url?: any;
  navigation?: {
    all_episodes?: { slug: string };
    previous_episode?: { slug: string };
    next_episode?: { slug: string };
  };
  donghua_details?: {
    title: string;
    slug: string;
    poster: string;
  };
  episodes_list?: {
    episode: string;
    slug: string;
  }[];
}

async function fetchAPI<T>(endpoint: string): Promise<T | null> {
  // Check cache first
  const cached = getCached<T>(endpoint);
  if (cached) return cached;

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    const json = await response.json();

    // Cache the result
    setCache(endpoint, json);

    return json;
  } catch (error) {
    console.error(`[StreamX] API Fetch Failed for ${endpoint}:`, error);
    return null;
  }
}

export const getHomeData = (page = 1) => fetchAPI<HomeData>(`/home/${page}`);
export const getDetail = (slug: string) => fetchAPI<DetailData>(`/detail/${slug}`);
export const getEpisode = (slug: string) => fetchAPI<EpisodeData>(`/episode/${slug}`);

// Search
export interface SearchResult {
  data: {
    title: string;
    slug: string;
    poster: string;
    status: string;
    type: string;
    sub?: string;
    href: string;
  }[];
}

export const searchDonghua = (keyword: string) =>
  fetchAPI<SearchResult>(`/search/${encodeURIComponent(keyword)}`);

// Schedule
export interface ScheduleItem {
  title: string;
  slug: string;
  poster: string;
  release_time: string;
  episode: string;
  href: string;
}

export interface ScheduleDay {
  day: string;
  donghua_list: ScheduleItem[];
}

export interface ScheduleData {
  schedule: ScheduleDay[];
}

export const getSchedule = () => fetchAPI<ScheduleData>('/schedule');

// Genres
export interface GenreItem {
  name: string;
  slug: string;
  href: string;
  anichinUrl: string;
}

export interface GenresData {
  data: GenreItem[];
}

export interface GenreDetailItem {
  title: string;
  slug: string;
  poster: string;
  status: string;
  type: string;
  sub?: string;
  href: string;
}

export interface GenreDetailData {
  data: GenreDetailItem[];
}

export const getGenres = () => fetchAPI<GenresData>('/genres');
export const getGenreDetail = (slug: string, page = 1) =>
  fetchAPI<GenreDetailData>(`/genres/${slug}/${page}`);
