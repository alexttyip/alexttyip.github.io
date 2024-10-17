import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import CurrentlyPlayingComponent from "./components/CurrentlyPlayingComponent.tsx";
import TimelineComponent from "./components/TimelineComponent.tsx";
import "./index.css";

const router = createHashRouter([
  {
    path: "/",
    element: <CurrentlyPlayingComponent />,
  },
  {
    path: "/timeline",
    element: <TimelineComponent />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
