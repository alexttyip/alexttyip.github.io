import { clearTokensAndForceReLogin } from "./authorization.ts";

type CurrentlyPlayingResponse = {
  is_playing: boolean;
  progress_ms: number | null;
  item?: TrackResponse;
};

type TrackResponse = {
  name: string;
  duration_ms: number;
  album: {
    images: ImageResponse[];
  };
  artists: ArtistResponse[];
};

type ImageResponse = {
  url: string;
};

type ArtistResponse = {
  name: string;
};

export type Track = {
  name: string;
  imageUrl: string;
  artists: string[];
  progressMs: number;
  durationMs: number;
  isPlaying: boolean;
  /** Local clock when progressMs was read, so we can interpolate between polls. */
  sampledAt: number;
};

export async function getCurrentlyPlaying(): Promise<Track | undefined> {
  const accessToken = localStorage.getItem("access_token");

  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    },
  );

  if (!response.ok) {
    if (response.status >= 400 && response.status < 500) {
      await clearTokensAndForceReLogin();
    }

    throw new Error("Get currently playing HTTP status " + response.status);
  }

  // Nothing is playing at all
  if (response.status === 204) {
    return;
  }

  const sampledAt = Date.now();
  const { item, progress_ms, is_playing } =
    (await response.json()) as CurrentlyPlayingResponse;

  if (!item) {
    return;
  }

  return {
    name: item.name,
    imageUrl: item.album.images[0].url,
    artists: item.artists.map(({ name }) => name),
    progressMs: progress_ms ?? 0,
    durationMs: item.duration_ms,
    isPlaying: is_playing,
    sampledAt,
  };
}
