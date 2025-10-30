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
    // Proactively refresh token before each Spotify API call
    async function poll() {
      if (!localStorage.getItem("access_token")) {
        return;
      }

      try {
        await getRefreshToken();
        const track = await getCurrentlyPlaying();
        setCurrentlyPlaying(track);
      } catch (err) {
        console.warn("[Spotify] Polling error:", err);
      }
    }

    void poll();
    const interval = setInterval(poll, 2000);

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
