export type Club = {
  id: string;
  name: string;
  logo_emoji: string;
  description: string;
  tags: string[];
  /** Used for filter chips (Sports, Tech, Arts, …) */
  categories: string[];
  /** Used to render the Oracle leaderboard (optional for backwards compatibility). */
  popularity_score?: number;
  vibe: string;
};
