import "./QueueComponent.css";

import { requestAccessToken, requestAuth } from "../clients/authorization.ts";
import { useEffect, useState } from "react";
import { getQueue, Queue } from "../clients/queueClient.ts";
import TrackComponent from "./TrackComponent.tsx";

function QueueComponent() {
  const [queue, setQueue] = useState<Queue>();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      void requestAccessToken();
    } else {
      void getQueue().then(setQueue);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      void getQueue().then(setQueue);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!localStorage.getItem("access_token")) {
    return (
      <div className="container">
        <button onClick={requestAuth}>Log in</button>
      </div>
    );
  }

  if (!queue) {
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
    <div className="queue">
      {queue.map((item, i) => (
        <TrackComponent {...item} isCurrent={i === 0} channel={channel} />
      ))}
    </div>
  );
}

export default QueueComponent;
