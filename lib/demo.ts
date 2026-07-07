export type DemoVideo = {
  slug: string;
  title: string;
  description: string;
  /** YouTube video ID, or any embeddable URL — wire up once videos are recorded. */
  embedUrl: string;
  thumbnail: string;
};

// Add entries here once demo videos are recorded — the page renders
// a "coming soon" placeholder automatically while this is empty.
export const demoVideos: DemoVideo[] = [];
