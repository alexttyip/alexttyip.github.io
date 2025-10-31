import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
