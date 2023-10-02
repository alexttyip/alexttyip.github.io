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

export type Queue = Track[];

export type Track = {
  name: string;
  imageUrl: string;
  artists: string[];
};

export async function getQueue(): Promise<Queue> {
  const accessToken = localStorage.getItem("access_token");

  const response = await fetch("https://api.spotify.com/v1/me/player/queue", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  const { currently_playing, queue } = (await response.json()) as QueueResponse;

  return [currently_playing, ...queue.slice(0, 2)].map(
    ({ name, album, artists }) => ({
      name,
      imageUrl: album.images[0].url,
      artists: artists.map(({ name }) => name),
    }),
  );
}
