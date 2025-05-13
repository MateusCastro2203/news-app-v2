export interface NewsResult {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  source_name: string;
  source_url: string;
  image_url: string;
  published_at: string; // ou Date se você preferir usar objetos Date
  category: string[];
  source_type: string;
}

export interface NewsResponse {
  results: NewsResult[];
  nextPage?: string; // Opcional, para paginação
  totalResults?: number; // Opcional, total de resultados disponíveis
}
export interface SavedNews extends NewsResult {
  savedAt: string;
}
export interface FavoritesStore {
  savedNews: SavedNews[];
  addToFavorites: (news: NewsResult) => void;
  removeFromFavorites: (articleId: string) => void;
  isFavorite: (articleId: string) => boolean;
  clearFavorites: () => void;
}
