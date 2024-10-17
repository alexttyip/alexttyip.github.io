import Color from "color";
import "./TrackComponent.css";
import { Track } from "../clients/currentlyPlayingClient.ts";

type TrackComponentProps = Track & {
  channel: string;
};

const TrackComponent = ({
  name,
  imageUrl,
  artists,
  channel,
}: TrackComponentProps) => {
  const colorObj = Color(channel);

  return (
    <div
      className="trackContainer"
      style={{
        background: colorObj.hexa(),
        color: colorObj.isLight() ? "black" : "white",
      }}
    >
      <img src={imageUrl} alt={name} />
      <h1>{name}</h1>
      <h2>{artists.join(", ")}</h2>
    </div>
  );
};

export default TrackComponent;
