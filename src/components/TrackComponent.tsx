import { useColor } from "color-thief-react";
import Color from "color";
import "./TrackComponent.css";
import { Track } from "../clients/queueClient.ts";

type TrackComponentProps = Track & {
  isCurrent?: boolean;
  channel: string;
};

const TrackComponent = ({
  name,
  imageUrl,
  artists,
  isCurrent,
  channel,
}: TrackComponentProps) => {
  const { data = channel } = useColor(imageUrl, "rgbString", {
    crossOrigin: "Anonymous",
  });

  const colorObj = isCurrent
    ? Color(channel)
    : Color(data).lighten(0.2).fade(0.5);

  return (
    <div
      className={`trackContainer ${isCurrent && "currentlyPlaying"}`}
      style={{
        background: colorObj.hexa(),
      }}
    >
      <div className="trackInnerContainer">
        <img src={imageUrl} alt={name} />

        <div
          className="detailsContainer"
          style={{
            color: colorObj.isLight() ? "black" : "white",
          }}
        >
          <h1>{name}</h1>
          <h2>{artists.join(", ")}</h2>
        </div>
      </div>
    </div>
  );
};

export default TrackComponent;
