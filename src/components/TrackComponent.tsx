import Color from "color";
import "./TrackComponent.css";
import type { Track } from "../clients/currentlyPlayingClient.ts";
import ProgressBarComponent from "./ProgressBarComponent.tsx";

type TrackComponentProps = Track & {
  channel: string;
};

const TrackComponent = ({
  name,
  imageUrl,
  artists,
  channel,
  progressMs,
  durationMs,
  isPlaying,
  sampledAt,
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
      <div style={{
        display: "flex",
        flexDirection: "column",
      }}>
        <h1>{name}</h1>
        <h2>{artists.join(", ")}</h2>
      </div>

      <ProgressBarComponent
        progressMs={progressMs}
        durationMs={durationMs}
        isPlaying={isPlaying}
        sampledAt={sampledAt}
      />
    </div>
  );
};

export default TrackComponent;
