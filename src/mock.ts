import type { Track } from "./clients/currentlyPlayingClient.ts";

const mockAlbumArt =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="640">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1EB6C8"/>
          <stop offset="100%" stop-color="#F83F78"/>
        </linearGradient>
      </defs>
      <rect width="640" height="640" fill="url(#g)"/>
      <circle cx="320" cy="320" r="120" fill="#3f464d"/>
      <circle cx="320" cy="320" r="24" fill="#c9ced4"/>
    </svg>`,
  );

export const mockTrack: Track = {
  name: "Friday",
  imageUrl: mockAlbumArt,
  artists: ["Avril Lavigne"],
};

export const isMockMode = () => import.meta.env.VITE_MOCK === "1";
