export type WeddingEvent = {
  id: string;
  name: string;
  time: string;
  date: string;
  theme: string;
  venue: string;
  accent: string;
};

export const events: WeddingEvent[] = [
  {
    id: "mehandi",
    name: "Mehandi",
    time: "2:00 PM",
    date: "11th December",
    theme: "Dark pink & orange decor",
    venue: "Lawn setting with palm trees",
    accent: "oklch(0.62 0.19 15)",
  },
  {
    id: "engagement-sangeet",
    name: "Engagement & Sangeet",
    time: "6:30 PM",
    date: "11th December",
    theme: "Royal blue & gold decor",
    venue: "Lawn with a stage and truss lighting",
    accent: "oklch(0.45 0.16 265)",
  },
  {
    id: "masquerade",
    name: "Masquerade",
    time: "10:30 PM",
    date: "11th December",
    theme: "Black & magenta decor",
    venue: "Indoor hall with a disco ball",
    accent: "oklch(0.5 0.24 330)",
  },
  {
    id: "haldi",
    name: "Haldi",
    time: "10:30 AM",
    date: "12th December",
    theme: "Pastel lilac & yellow decor",
    venue: "Pool deck with rain dance",
    accent: "oklch(0.72 0.13 300)",
  },
  {
    id: "baarat",
    name: "Baarat",
    time: "4:00 PM",
    date: "12th December",
    theme: "Dhol players & dancing procession",
    venue: "Street procession to the venue",
    accent: "oklch(0.68 0.17 55)",
  },
  {
    id: "varmala",
    name: "Varmala",
    time: "5:30 PM",
    date: "12th December",
    theme: "White & pink mandap",
    venue: "Set on the beach",
    accent: "oklch(0.75 0.09 10)",
  },
  {
    id: "fera",
    name: "Fera",
    time: "11:00 PM",
    date: "12th December",
    theme: "Taaron ki chhaon — under a starry sky",
    venue: "Red-toned decor",
    accent: "oklch(0.5 0.2 25)",
  },
];
