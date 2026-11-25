// Pages are refreshed on publish by the Sanity webhook (src/pages/api/revalidate.js).
// This is only the safety net if a webhook delivery is missed: at most a day stale.
export const REVALIDATE_SECONDS = 60 * 60 * 24;
