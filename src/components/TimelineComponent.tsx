import dayjs from "dayjs";
import "./TimelineComponent.css";

import { useEffect, useState } from "react";

const getFullTime = (hour: number, minute: number) =>
  dayjs().set("hour", hour).set("minute", minute);

const schedule: {
  title: string;
  startTime: dayjs.Dayjs;
}[] = [
  {
    title: "🎉 Let the party begin 🎉",
    startTime: getFullTime(0, 0),
  },
  {
    title: "🍕 Pizza Wave 1! 🍕",
    startTime: getFullTime(18, 30),
  },
  {
    title: "🎤 ¡Alt-0161¡ 🎸",
    startTime: getFullTime(20, 0),
  },
  {
    title: "🐓 Cardinal Rule 🇺🇸",
    startTime: getFullTime(20, 30),
  },
  {
    title: "🎧 Silent disco 🎧",
    startTime: getFullTime(20, 45),
  },
  {
    title: "🍕 Pizza wave 2! 🍕",
    startTime: getFullTime(21, 30),
  },
  {
    title: "🎂 Cake¡ 🎂",
    startTime: getFullTime(21, 0),
  },
];

function TimelineComponent() {
  const [time, setTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => setTime(dayjs()), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="timeline">
      {schedule
        .map(({ title, startTime }, i, arr) => {
          if (time.isBefore(startTime)) {
            return (
              <div
                className="eventContainer"
                style={{ background: "none" }}
                key={title}
              >
                <div style={{ color: "white" }} className="eventInnerContainer">
                  <h1>{title}</h1>
                  <h2>{`${startTime.format("HH:mm")} aka ${startTime.unix()}`}</h2>
                </div>
              </div>
            );
          }

          if (time.isAfter(startTime) && time.isBefore(arr[i + 1].startTime)) {
            return (
              <div
                className="eventContainer currentlyHappening"
                style={{ background: "#F9DC62" }}
                key={title}
              >
                <div style={{ color: "black" }} className="eventInnerContainer">
                  <h1>{title}</h1>
                  <h2>{`${startTime.format("HH:mm")} aka ${startTime.unix()}`}</h2>
                </div>
              </div>
            );
          }

          return null;
        })
        .filter(Boolean)
        .slice(0, 3)}

      <div className="easterEgg">{time.unix()}</div>
    </div>
  );
}

export default TimelineComponent;
