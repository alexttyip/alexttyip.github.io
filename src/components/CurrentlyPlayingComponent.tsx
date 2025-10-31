import "./CurrentlyPlayingComponent.css";
import {
  getRefreshToken,
  requestAccessToken,
  requestAuth,
} from "../clients/authorization.ts";
import { useEffect, useState } from "react";
import {
  getCurrentlyPlaying,
  type Track,
} from "../clients/currentlyPlayingClient.ts";
import TrackComponent from "./TrackComponent.tsx";

const setChannelQueryParam = (channel: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set("channel", channel);
  window.location.href = url.toString();
};

const CurrentlyPlayingComponent = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<Track>();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      void requestAccessToken();
    }
  }, []);

  useEffect(() => {
    async function checkAndRefreshToken() {
      try {
        const expiry = Number(localStorage.getItem("token_expiry") || 0);
        const thirtyMinutesInMs = 1_800_000;

        // Refresh if we're past the 30-minute mark of the 1-hour window
        if (Date.now() >= expiry - thirtyMinutesInMs) {
          await getRefreshToken();
        }
      } catch (err) {
        console.warn("[Spotify] Token refresh error:", err);
      }
    }

    async function pollCurrentTrack() {
      if (!localStorage.getItem("access_token")) {
        return;
      }

      try {
        const track = await getCurrentlyPlaying();
        setCurrentlyPlaying(track);
      } catch (err) {
        console.warn("[Spotify] Polling error:", err);
      }
    }

    void pollCurrentTrack();

    // Set up intervals
    const tokenCheckInterval = setInterval(checkAndRefreshToken, 60_000); // 1 minute
    const pollInterval = setInterval(pollCurrentTrack, 2_000); // 2 seconds

    return () => {
      clearInterval(tokenCheckInterval);
      clearInterval(pollInterval);
    };
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
          onClick={() => setChannelQueryParam("red")}
          style={{ background: "red" }}
        >
          Red
        </button>

        <button
          onClick={() => setChannelQueryParam("blue")}
          style={{ background: "blue" }}
        >
          Blue
        </button>

        <button
          onClick={() => setChannelQueryParam("green")}
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
};

export default CurrentlyPlayingComponent;
