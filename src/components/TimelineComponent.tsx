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
    startTime: getFullTime("00:23"),
    endTime: getFullTime("00:24"),
  },
  {
    title: "🥘 Food! 🧆",
    startTime: getFullTime("00:24"),
    endTime: getFullTime("00:25"),
  },
  {
    title: "🎤 ¡Alt-0161¡ 🎸",
    startTime: getFullTime("00:25"),
    endTime: getFullTime("00:26"),
  },
  {
    title: "🎧 Silent disco 🎧",
    startTime: getFullTime("00:26"),
    endTime: getFullTime("00:30"),
  },
  {
    title: "🍕 Pizza! 🍕",
    startTime: getFullTime("00:30"),
    endTime: getFullTime("00:59")
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
            className={`eventContainer ${isCurrent && "currentlyHappening"}`}
            style={{ background: isCurrent ? "#F9DC62" : "none" }}
          >
            <div className="eventInnerContainer">
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

      <div className="easterEgg">{time.unix()}</div>
    </div>
  );
}

export default TimelineComponent;
