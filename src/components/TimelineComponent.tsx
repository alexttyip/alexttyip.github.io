import "./TimelineComponent.css";

import { useEffect, useState } from "react";

const schedule = [
  {
    title: "🎉 Let the party begin 🎉",
    startTime: 1800,
    endTime: 1900,
  },
  {
    title: "🥘 Food! 🧆",
    startTime: 1900,
    endTime: 2000,
  },
  {
    title: "🎤 ¡Alt-0161¡ 🎸",
    startTime: 2000,
    endTime: 2100,
  },
  {
    title: "🎧 Silent disco 🎧",
    startTime: 2100,
    endTime: 2130,
  },
  {
    title: "🍕 Pizza! 🍕",
    startTime: 2130,
    endTime: 2200,
  },
];

const getCurrentTime = () => {
  const date = new Date();

  // DST +1
  return (date.getUTCHours() + 1 - 4) * 100 + date.getUTCMinutes();
};

function TimelineComponent() {
  const [time, setTime] = useState<number>(getCurrentTime);

  useEffect(() => {
    const interval = setInterval(() => setTime(getCurrentTime), 10_000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="timeline">
      {schedule.map(({ title, startTime, endTime }) => {
        const isCurrent = startTime <= time;
        return time <= endTime ? (
          <div
            className={`trackContainer ${isCurrent && "currentlyPlaying"}`}
            style={{ background: isCurrent ? "#F9DC62" : "none" }}
          >
            <div className="trackInnerContainer">
              <h1 style={{ color: isCurrent ? "black" : "white" }}>{title}</h1>
              <h2 style={{ color: isCurrent ? "black" : "white" }}>
                {`${startTime.toString().substring(0, 2)}:${startTime
                  .toString()
                  .substring(2)}`}
              </h2>
            </div>
          </div>
        ) : null;
      })}
    </div>
  );
}

export default TimelineComponent;
