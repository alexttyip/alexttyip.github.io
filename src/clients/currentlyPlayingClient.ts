import { clearTokensAndForceReLogin } from "./authorization.ts";

type QueueResponse = {
  currently_playing?: TrackResponse;
};

type TrackResponse = {
  name: string;
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
};

export async function getCurrentlyPlaying(): Promise<Track | undefined> {
  const accessToken = localStorage.getItem("access_token");

  const response = await fetch("https://api.spotify.com/v1/me/player/queue", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  if (!response.ok) {
    if (response.status >= 400 && response.status < 500) {
      await clearTokensAndForceReLogin();
    }

    throw new Error("Get queue HTTP status " + response.status);
  }

  const { currently_playing } = (await response.json()) as QueueResponse;

  if (!currently_playing) {
    return;
  }

  return {
    name: currently_playing.name,
    imageUrl: currently_playing.album.images[0].url,
    artists: currently_playing.artists.map(({ name }) => name),
  };
}
