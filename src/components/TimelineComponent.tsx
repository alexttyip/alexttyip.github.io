import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import "./TimelineComponent.css";

import { useEffect, useState } from "react";

dayjs.extend(isBetween);

const PARTY_DATE = "2023-10-20";

const getFullTime = (time: string) => `${PARTY_DATE}T${time}:00+01:00`;

const schedule = [
  {
    title: "🎉 Let the party begin 🎉",
    startTime: getFullTime("00:08"),
    endTime: getFullTime("00:09"),
  },
  {
    title: "🥘 Food! 🧆",
    startTime: getFullTime("00:09"),
    endTime: getFullTime("00:13"),
  },
  {
    title: "🎤 ¡Alt-0161¡ 🎸",
    startTime: getFullTime("00:14"),
    endTime: getFullTime("00:15"),
  },
  {
    title: "🎧 Silent disco 🎧",
    startTime: getFullTime("00:15"),
    endTime: getFullTime("00:16"),
  },
  {
    title: "🍕 Pizza! 🍕",
    startTime: `${PARTY_DATE} 23:50`,
    endTime: `${PARTY_DATE} 23:50`,
  },
];

function TimelineComponent() {
  const [time, setTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => setTime(dayjs()), 1000);

    return () => clearInterval(interval);
  }, []);

  console.log(time.toISOString());

  return (
    <div className="timeline">
      {schedule.map(({ title, startTime, endTime }) => {
        const isCurrent = time.isBetween(startTime, endTime);

        return time.isBefore(endTime) ? (
          <div
            className={`trackContainer ${isCurrent && "currentlyPlaying"}`}
            style={{ background: isCurrent ? "#F9DC62" : "none" }}
          >
            <div className="trackInnerContainer">
              <h1 style={{ color: isCurrent ? "black" : "white" }}>{title}</h1>
              <h2 style={{ color: isCurrent ? "black" : "white" }}>
                {`${dayjs(startTime).format("HH:mm")} aka ${dayjs(
                  startTime,
                ).unix()}`}
              </h2>
            </div>
          </div>
        ) : null;
      })}
    </div>
  );
}

export default TimelineComponent;
