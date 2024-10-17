type QueueResponse = {
  currently_playing: TrackResponse;
  queue: TrackResponse[];
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

export async function getCurrentlyPlaying(): Promise<Track> {
  const accessToken = localStorage.getItem("access_token");

  const response = await fetch("https://api.spotify.com/v1/me/player/queue", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  if (!response.ok) {
    console.error("Get queue HTTP status " + response.status);

    throw new Error("Get queue HTTP status " + response.status);
  }

  const { currently_playing } = (await response.json()) as QueueResponse;

  return {
    name: currently_playing.name,
    imageUrl: currently_playing.album.images[0].url,
    artists: currently_playing.artists.map(({ name }) => name),
  };
}
