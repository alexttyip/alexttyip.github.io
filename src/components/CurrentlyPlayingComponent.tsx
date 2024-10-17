import "./CurrentlyPlayingComponent.css";
import {
  getRefreshToken,
  requestAccessToken,
  requestAuth,
} from "../clients/authorization.ts";
import { useEffect, useState } from "react";
import {
  getCurrentlyPlaying,
  Track,
} from "../clients/currentlyPlayingClient.ts";
import TrackComponent from "./TrackComponent.tsx";

function CurrentlyPlayingComponent() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<Track>();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      void requestAccessToken();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (localStorage.getItem("access_token")) {
        void getCurrentlyPlaying()
          .then(setCurrentlyPlaying)
          .catch(getRefreshToken);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  if (!localStorage.getItem("access_token")) {
    return (
      <div className="container">
        <button onClick={requestAuth}>Log in</button>
      </div>
    );
  }

  if (!currentlyPlaying) {
    return <div className="container">You sure you're playing something?</div>;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const channel = urlParams.get("channel");

  if (!channel) {
    return (
      <div className="container channelSelector">
        <button
          onClick={() => {
            window.location.href = `${window.location.href}&channel=red`;
          }}
          style={{ background: "red" }}
        >
          Red
        </button>

        <button
          onClick={() => {
            window.location.href = `${window.location.href}&channel=blue`;
          }}
          style={{ background: "blue" }}
        >
          Blue
        </button>

        <button
          onClick={() => {
            window.location.href = `${window.location.href}&channel=green`;
          }}
          style={{ background: "green" }}
        >
          Green
        </button>
      </div>
    );
  }

  return (
    <div className="currentlyPlayingWrapper">
      <TrackComponent {...currentlyPlaying} channel={channel} />
    </div>
  );
}

export default CurrentlyPlayingComponent;
