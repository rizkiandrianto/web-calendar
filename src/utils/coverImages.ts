export const COVER_IMAGES = (import.meta.env.VITE_COVER_IMAGES || '').split(',');

export const DEFAULT_COVER_POSITIONS = [
  -550, // Cover 0 - from Cover.tsx object-[0_-550px]
  -380, // Cover 1 - from Cover2.tsx object-[0_-380px]
  -550  // Cover 2 - same default as Cover 0
];