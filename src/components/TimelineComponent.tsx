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
    startTime: getFullTime("00:00"),
    endTime: getFullTime("19:00"),
  },
  {
    title: "🥘 Food! 🧆",
    startTime: getFullTime("19:00"),
    endTime: getFullTime("20:00"),
  },
  {
    title: "🎤 ¡Alt-0161¡ 🎸",
    startTime: getFullTime("20:00"),
    endTime: getFullTime("21:00"),
  },
  {
    title: "🎧 Silent disco 🎧",
    startTime: getFullTime("21:00"),
    endTime: getFullTime("21:30"),
  },
  {
    title: "🍕 Pizza! 🍕",
    startTime: getFullTime("21:30"),
    endTime: getFullTime("23:59"),
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
        .map(({ title, startTime, endTime }) => {
          const isCurrent = time.isBetween(startTime, endTime);

          return time.isBefore(endTime) ? (
            <div
              className={`eventContainer ${isCurrent && "currentlyHappening"}`}
              style={{ background: isCurrent ? "#F9DC62" : "none" }}
              key={title}
            >
              <div
                style={{ color: isCurrent ? "black" : "white" }}
                className="eventInnerContainer"
              >
                <h1>{title}</h1>
                <h2>{`${dayjs(startTime).format("HH:mm")} aka ${dayjs(
                  startTime,
                ).unix()}`}</h2>
              </div>
            </div>
          ) : null;
        })
        .filter(Boolean)
        .slice(0, 3)}

      <div className="easterEgg">{time.unix()}</div>
    </div>
  );
}

export default TimelineComponent;
