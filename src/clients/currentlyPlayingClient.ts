import { clearTokensAndForceReLogin } from "./authorization.ts";

type CurrentlyPlayingResponse = {
  item?: TrackResponse;
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

  const { item } = (await response.json()) as CurrentlyPlayingResponse;

  if (!item) {
    return;
  }

  return {
    name: item.name,
    imageUrl: item.album.images[0].url,
    artists: item.artists.map(({ name }) => name),
  };
}
