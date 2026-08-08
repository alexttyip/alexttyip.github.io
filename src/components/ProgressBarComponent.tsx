import "./ProgressBarComponent.css";
import { useEffect, useState } from "react";

type ProgressBarComponentProps = {
  progressMs: number;
  durationMs: number;
  isPlaying: boolean;
  sampledAt: number;
};

// "Tick" locally in between Spotify polls to keep the bar moving smoothly instead of jumping.
const TICK_MS = 250;

const ProgressBarComponent = ({
  progressMs,
  durationMs,
  isPlaying,
  sampledAt,
}: ProgressBarComponentProps) => {
  const [elapsedMs, setElapsedMs] = useState(progressMs);

  useEffect(() => {
    function tick() {
      const sinceSample = isPlaying ? Date.now() - sampledAt : 0;
      setElapsedMs(Math.min(progressMs + sinceSample, durationMs));
    }

    tick();

    if (!isPlaying) {
      return;
    }

    const interval = setInterval(tick, TICK_MS);

    return () => clearInterval(interval);
  }, [progressMs, durationMs, isPlaying, sampledAt]);

  const percent = durationMs > 0 ? (elapsedMs / durationMs) * 100 : 0;

  return (
    <div className="progressBar">
      <div className="progressBarFill" style={{ width: `${percent}%` }} />
    </div>
  );
};

export default ProgressBarComponent;
